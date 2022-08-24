import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Link,
    Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

const Profile = () => {
   const { user } = useSelector((state) => state.auth)

   return (
      <Container>
         <Box sx={{ my: 2 }}>
            <Card sx={{ minWidth: 275 }}>
               <CardContent>
                  <Typography variant='h5' gutterBottom>
                     Your Profile
                  </Typography>
                  <Typography variant='body2'>{user.name}</Typography>
                  <Typography variant='body2'>{user.email}</Typography>
               </CardContent>
            </Card>
         </Box>
         <Box sx={{ my: 2 }}>
            <Button variant='contained' color='secondary' fullWidth>
               <Link
                  component={RouterLink}
                  to='/newcar'
                  variant='h6'
                  sx={{ textDecoration: 'none' }}
               >
                  Create a new listing
               </Link>
            </Button>
         </Box>
      </Container>
   )
}

export default Profile
