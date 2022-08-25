import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import carService from './carService'

const initialState = {
   cars: [],
   car: {},
   isError: false,
   isSuccess: false,
   isLoading: false,
   messages: '',
}

// Create new car
export const createCar = createAsyncThunk(
   'cars/create',
   async (carData, thunkAPI) => {
      try {
         const token = thunkAPI.getState().auth.user.token
         return await carService.createCar(carData, token)
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()

         return thunkAPI.rejectWithValue(message)
      }
   }
)

// Get user cars
export const getCars = createAsyncThunk('cars/getAll', async (_, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token
      return await carService.getCars(token)
   } catch (error) {
      const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
         error.message ||
         error.toString()

      return thunkAPI.rejectWithValue(message)
   }
})

// Get user car
export const getCar = createAsyncThunk('cars/get', async (carId, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token
      return await carService.getCar(carId, token)
   } catch (error) {
      const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
         error.message ||
         error.toString()

      return thunkAPI.rejectWithValue(message)
   }
})

// Get user cars
export const getAllCars = createAsyncThunk(
   'cars/getAllNoAuth',
   async (_, thunkAPI) => {
      try {
         return await carService.getAllCars()
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()

         return thunkAPI.rejectWithValue(message)
      }
   }
)

export const carSlice = createSlice({
   name: 'car',
   initialState,
   reducers: {
      reset: (state) => initialState,
   },
   extraReducers: (builder) => {
      builder
         .addCase(createCar.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createCar.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(createCar.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
         })
         .addCase(getCars.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCars.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.cars = action.payload
         })
         .addCase(getCars.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
         })
         .addCase(getCar.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCar.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.car = action.payload
         })
         .addCase(getCar.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
         })
   },
})

export const { reset } = carSlice.actions
export default carSlice.reducer
