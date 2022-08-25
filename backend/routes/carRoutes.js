const express = require('express')
const router = express.Router()
const multer = require('multer')
const {storage} = require('../config/cloudinary')
const upload = multer({storage})

const {
   getCars,
   getAllCars,
   getCar,
   createCar,
   deleteCar,
   updateCar,
} = require('../controllers/carController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCars).post(protect, upload.array('image'), createCar)

router.route('/all').get(getAllCars)

router
   .route('/:id')
   .get(protect, getCar)
   .delete(protect, deleteCar)
   .put(protect, updateCar)

module.exports = router
