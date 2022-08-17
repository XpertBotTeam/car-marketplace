import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

const theme = createTheme()

export default function Register() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
   )

   useEffect(() => {
      if (isError) {
         toast.error(message)
      }

      // Redirect when logged in
      if (isSuccess || user) {
         navigate('/')
      }

      dispatch(reset())
   }, [isError, isSuccess, user, message, navigate, dispatch])

   const handleSubmit = (e) => {
      e.preventDefault()

      const data = new FormData(e.currentTarget)
      const userData = {
         name: data.get('name'),
         email: data.get('email'),
         password: data.get('password'),
      }
      console.log(userData)
      dispatch(register(userData))
   }
   return (
      <>
         {isLoading && <LinearProgress />}
         <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ m: 1, backgroundColor: 'primary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Sign up
               </Typography>
               <Box
                  component='form'
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete='given-name'
                           name='name'
                           required
                           fullWidth
                           id='name'
                           label='Name'
                           autoFocus
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           id='email'
                           label='Email Address'
                           name='email'
                           autoComplete='email'
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name='password'
                           label='Password'
                           type='password'
                           id='password'
                           autoComplete='new-password'
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign Up
                  </Button>
                  <Grid container justifyContent='flex-end'>
                     <Grid item>
                        <Link
                           component={RouterLink}
                           to='/login'
                           variant='body2'
                        >
                           Already have an account? Sign in
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </>
   )
}
