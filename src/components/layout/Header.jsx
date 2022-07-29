import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import {
   AppBar,
   Box,
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Toolbar,
   Typography,
   Button,
   Stack,
} from '@mui/material'
import { Link } from 'react-router-dom'

const navItems = [
   <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
      Home
   </Link>,
   <Link to='/shop' style={{ textDecoration: 'none', color: 'white' }}>
      Shop
   </Link>,
   <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>
      About
   </Link>,
   <Link to='/contact' style={{ textDecoration: 'none', color: 'white' }}>
      Contact
   </Link>,
]
const navDrawerItems = [
   <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
      Home
   </Link>,
   <Link to='/shop' style={{ textDecoration: 'none', color: 'black' }}>
      Shop
   </Link>,
   <Link to='/about' style={{ textDecoration: 'none', color: 'black' }}>
      About
   </Link>,
   <Link to='/contact' style={{ textDecoration: 'none', color: 'black' }}>
      Contact
   </Link>,
]

const Header = (props) => {
   const { window } = props
   const [mobileOpen, setMobileOpen] = useState(false)
   const [title] = useState(
      <Link to='/' style={{ textDecoration: 'none', color: 'white   ' }}>
         Carleto
      </Link>
   )

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
   }

   // This is the menu for the mobile view
   const drawer = (
      <Box onClick={handleDrawerToggle}>
         <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ py: 1, px: 2, backgroundColor: 'secondary' }}
         >
            <Typography variant='h6'>{title}</Typography>
            <IconButton
               color='inherit'
               aria-label='close drawer'
               onClick={handleDrawerToggle}
               sx={{ display: { sm: 'none' } }}
            >
               <CloseIcon />
            </IconButton>
         </Stack>
         <Divider />
         <List>
            {/* Here where the links will go */}
            {navDrawerItems.map((item, index) => (
               <ListItem key={index}>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                     <ListItemText primary={item} />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </Box>
   )

   const container =
      window !== undefined ? () => window().document.body : undefined

   return (
      <Box sx={{ display: 'flex', p: 4 }}>
         <AppBar component='nav' color='primary'>
            <Toolbar>
               <Typography
                  variant='h6'
                  component='div'
                  sx={{ flexGrow: 1, display: { sm: 'block' } }}
               >
                  {title}
               </Typography>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ display: { sm: 'none' } }}
               >
                  <MenuIcon />
               </IconButton>

               {/* desktop view page button */}
               <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {navItems.map((item) => (
                     <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                     </Button>
                  ))}
               </Box>
            </Toolbar>
         </AppBar>

         <Box component='nav'>
            <Drawer
               container={container}
               variant='temporary'
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: '100%',
                  },
               }}
            >
               {drawer}
            </Drawer>
         </Box>
      </Box>
   )
}

export default Header
