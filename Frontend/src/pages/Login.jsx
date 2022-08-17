import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'

export default function SignIn() {
   const navigate = useNavigate()
   const dispatch = useDispatch()

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
         email: data.get('email'),
         password: data.get('password'),
      }
      dispatch(login(userData))
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
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Sign in
               </Typography>
               <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
               >
                  <TextField
                     margin='normal'
                     required
                     fullWidth
                     id='email'
                     label='Email Address'
                     name='email'
                     autoComplete='email'
                     autoFocus
                  />
                  <TextField
                     margin='normal'
                     required
                     fullWidth
                     name='password'
                     label='Password'
                     type='password'
                     id='password'
                     autoComplete='current-password'
                  />
                  <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign In
                  </Button>
                  <Grid container>
                     <Grid item xs></Grid>
                     <Grid item>
                        <Link
                           component={RouterLink}
                           to='/register'
                           variant='body2'
                        >
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </>
   )
}
