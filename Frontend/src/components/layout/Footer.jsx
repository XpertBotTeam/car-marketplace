import { Box, Container, Paper, Typography } from '@mui/material'

const Footer = () => {
   return (
      <Paper
         component='footer'
         variant='outlined'
         square
         sx={{
            marginTop: 'calc(10% + 60px)',
            bottom: 0,
            backgroundColor: 'primary.main',
         }}
         >
         <Container maxWidth='lg'>
            <Box
               sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  my: 2,
               }}
            >
               <Typography variant='caption' color='white'>
                  Copyright ©{new Date().getFullYear()}
               </Typography>
            </Box>
         </Container>
      </Paper>
   )
}

export default Footer
