const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Car = require('../models/carModel')

// @desc    Get user car
// @route   GET /api/car
// @access  Private
const getCars = asyncHandler(async (req, res) => {
   // Get user using the id in the jwt
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   const cars = await Car.find({ user: req.user.id })

   res.status(200).json(cars)
})

// @desc    Get user car
// @route   GET /api/cars/:id
// @access  Private
const getCar = asyncHandler(async (req, res) => {
   // Get user using the id in the jwt
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   const car = await Car.findById(req.params.id)

   if (!car) {
      res.status(404)
      throw new Error('Car not found')
   }

   if (car.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
   }

   res.status(200).json(car)
})

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = asyncHandler(async (req, res) => {
   // Get user using the id in the jwt
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   const car = await Car.findById(req.params.id)

   if (!car) {
      res.status(404)
      throw new Error('car not found')
   }

   if (car.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
   }

   await car.remove()

   res.status(200).json({ success: true })
})

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private
const updateCar = asyncHandler(async (req, res) => {
   // Get user using the id in the jwt
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   const car = await Car.findById(req.params.id)

   if (!car) {
      res.status(404)
      throw new Error('Car not found')
   }

   if (car.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
   }

   const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   })

   res.status(200).json(updatedCar)
})

// @desc    Create new cars
// @route   POST /api/cars/post
// @access  Private
const createCar = asyncHandler(async (req, res) => {
   const {
      carName,
      price,
      description,
      condition,
      location,
      bodyType,
      brand,
      year,
      mileage,
      color,
      transmitionType,
   } = req.body

   if (!carName || !description) {
      res.status(400)
      throw new Error('Please add a car name and description')
   }

   // Get user using the id in the jwt
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   const car = await Car.create({
      description,
      user: req.user.id,
      carName,
      price,
      condition,
      location,
      bodyType,
      brand,
      year,
      mileage,
      color,
      transmitionType,
   })

   res.status(201).json(car)
})

module.exports = {
   getCars,
   getCar,
   createCar,
   deleteCar,
   updateCar,
}
