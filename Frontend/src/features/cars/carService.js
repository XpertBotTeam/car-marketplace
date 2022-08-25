import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/cars/'

// Create a car
const createCar = async (carData, token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   }

   const response = await axios.post(API_URL, carData, config)

   return response.data
}

// Get user cars
const getCars = async (token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   }

   const response = await axios.get(API_URL, config)

   return response.data
}

// Get user car
const getCar = async (carId, token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   }

   const response = await axios.get(API_URL + carId, config)

   return response.data
}

const carService = {
   createCar,
   getCars,
   getCar,
}

export default carService
