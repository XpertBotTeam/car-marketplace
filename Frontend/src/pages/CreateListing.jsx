import {
   Box,
   Button,
   Container,
   CssBaseline,
   FormControl,
   Grid,
   ImageList,
   InputLabel,
   LinearProgress,
   Link,
   MenuItem,
   Select,
   TextField,
   Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
   carBodyTypes,
   carBrands,
   carColors
} from '../features/cars/carSelectInfo'
import { createCar, reset } from '../features/cars/carSlice'

const CreateListing = () => {
   const { user } = useSelector((state) => state.auth)
   const { isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.car
   )

   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      if (isError) {
         toast.error(message)
      }

      if (isSuccess) {
         dispatch(reset())
         navigate('/shop')
      }

      dispatch(reset())
   }, [dispatch, navigate, isError, isSuccess, message])

   const [formData, setFormData] = useState({
      carName: '',
      price: '',
      description: '',
      condition: '',
      location: '',
      longitude: '',
      latitude: '',
      bodyType: '',
      brand: '',
      year: '',
      mileage: '',
      color: '',
      transmitionType: '',
      image: {},
   })

   const {
      carName,
      price,
      description,
      condition,
      location,
      longitude,
      latitude,
      bodyType,
      brand,
      year,
      mileage,
      color,
      transmitionType,
      image,
   } = formData

   //    on change function that change inout value by id
   const onChange = (e) => {
      //files
      if (e.target.files) {
         setFormData((prevState) => ({
            ...prevState,
            image: e.target.files,
         }))
      }
      setFormData({ ...formData, [e.target.id]: e.target.value })
   }

   const onSubmit = (e) => {
      e.preventDefault()
      if (
         carName === '' ||
         price === '' ||
         description === '' ||
         condition === '' ||
         location === '' ||
         longitude === '' ||
         latitude === '' ||
         bodyType === '' ||
         brand === '' ||
         year === '' ||
         mileage === '' ||
         color === '' ||
         transmitionType === '' ||
         image == {}
      ) {
         toast.error('Please fill all fields')
      } else {
         dispatch(
            createCar({
               carName,
               price,
               description,
               condition,
               location,
               longitude,
               latitude,
               bodyType,
               brand,
               year,
               mileage,
               color,
               transmitionType,
               image,
            })
         )
      }
   }
   return (
      <>
         {isLoading && <LinearProgress />}
         <Container component='div' maxWidth='xs'>
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Typography component='h1' variant='h5'>
                  Create a new car listing
               </Typography>
               <Box
                  component='form'
                  noValidate
                  onSubmit={onSubmit}
                  sx={{ mt: 3 }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='car-name'
                           name='carName'
                           required
                           fullWidth
                           id='carName'
                           label='Car listing name'
                           autoFocus
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name='price'
                           label='price'
                           type='Number'
                           id='price'
                           autoComplete='set-price'
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth>
                           <InputLabel id='brand-select-label'>
                              Brand
                           </InputLabel>
                           <Select
                              labelId='brand-select-label'
                              id='brand'
                              value={brand}
                              label='Brand'
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    brand: e.target.value,
                                 })
                              }
                              required
                           >
                              {carBrands.map((brand) => (
                                 <MenuItem key={brand} value={brand}>
                                    {brand}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth>
                           <InputLabel id='bodyType-select-label'>
                              Body Type
                           </InputLabel>
                           <Select
                              labelId='bodyType-select-label'
                              id='bodyType'
                              value={bodyType}
                              label='Body Type'
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    bodyType: e.target.value,
                                 })
                              }
                              required
                           >
                              {carBodyTypes.map((brand) => (
                                 <MenuItem key={brand} value={brand}>
                                    {brand}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth>
                           <InputLabel id='year-select-label'>Year</InputLabel>
                           <Select
                              labelId='year-select-label'
                              id='year'
                              value={year}
                              label='Year'
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    year: e.target.value,
                                 })
                              }
                              required
                           >
                              {Array.from(
                                 { length: new Date().getFullYear() - 1949 },
                                 (v, k) => k + 1950
                              )
                                 .reverse()
                                 .map((year) => (
                                    <MenuItem key={year} value={year}>
                                       {year}
                                    </MenuItem>
                                 ))}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth>
                           <InputLabel id='condition-select-label'>
                              Condition
                           </InputLabel>
                           <Select
                              labelId='year-select-label'
                              id='condition'
                              value={condition}
                              label='Condition'
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    condition: e.target.value,
                                 })
                              }
                              required
                           >
                              <MenuItem value={'new'}>New</MenuItem>
                              <MenuItem value={'used'}>Used</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='car-mileage'
                           name='mileage'
                           required
                           fullWidth
                           id='mileage'
                           label='Mileage'
                           type='Number'
                           autoFocus
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth>
                           <InputLabel id='color-select-label'>
                              Color
                           </InputLabel>
                           <Select
                              labelId='color-select-label'
                              id='color'
                              value={color}
                              label='Body Type'
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    color: e.target.value,
                                 })
                              }
                              required
                           >
                              {carColors.map((color) => (
                                 <MenuItem key={color} value={color}>
                                    {color}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth>
                           <InputLabel id='transmitionType-select-label'>
                              Transmition Type
                           </InputLabel>
                           <Select
                              labelId='transmitionType-select-label'
                              id='transmitionType'
                              value={transmitionType}
                              label='Transmition Type'
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    transmitionType: e.target.value,
                                 })
                              }
                              required
                           >
                              <MenuItem value={'automatic'}>Automatic</MenuItem>
                              <MenuItem value={'manual'}>Manual</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='car-location'
                           name='location'
                           required
                           fullWidth
                           id='location'
                           label='Location'
                           autoFocus
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='car-longitude'
                           name='longitude'
                           required
                           fullWidth
                           id='longitude'
                           label='Longitude'
                           autoFocus
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='car-latitude'
                           name='latitude'
                           required
                           fullWidth
                           id='latitude'
                           label='Latitude'
                           autoFocus
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='car-description'
                           name='description'
                           required
                           fullWidth
                           id='description'
                           label='Description'
                           autoFocus
                           multiline
                           rows={3}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Button
                           variant='contained'
                           component='label'
                           fullWidth
                           sx={{ textAlign: 'center' }}
                        >
                           Upload the Car Images
                           <br />
                           {image.length > 0
                              ? image.length + ' file(s) are selected'
                              : 'No files are selected'}
                           <input
                              type='file'
                              id='image'
                              max='6'
                              accept='.jpg,.png,.jpeg'
                              multiple
                              hidden
                              onChange={(e) => {
                                 setFormData((prevState) => ({
                                    ...prevState,
                                    image: e.target.files,
                                 }))
                              }}
                              required
                           />
                        </Button>
                     </Grid>
                  </Grid>
                  <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     color='secondary'
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Create
                  </Button>
               </Box>
            </Box>
         </Container>
      </>
   )
}

export default CreateListing
