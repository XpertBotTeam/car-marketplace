import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
   AppBar,
   Box,
   Button,
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Menu,
   MenuItem,
   Stack,
   Toolbar,
   Typography
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';

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
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.auth)

   const { window } = props
   const [mobileOpen, setMobileOpen] = useState(false)
   const [title] = useState(
      <Link to='/' style={{ textDecoration: 'none', color: 'white   ' }}>
         Carleto
      </Link>
   )

   const [anchorEl, setAnchorEl] = useState(null)

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      handleClose()
      navigate('/')
   }

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
                  {navItems.map((item, index) => (
                     <Button key={index} sx={{ color: '#fff' }}>
                        {item}
                     </Button>
                  ))}
                  {user ? (
                     // <Button
                     //    variant='contained'
                     //    color='secondary'
                     //    size='small'
                     //    sx={{ color: '#fff', marginLeft: '5px' }}
                     //    onClick={onLogout}
                     // >
                     //    Logout
                     // </Button>
                     <>
                        <IconButton
                           size='large'
                           aria-label='account of current user'
                           aria-controls='menu-appbar'
                           aria-haspopup='true'
                           onClick={handleMenu}
                           color='inherit'
                        >
                           <AccountCircle />
                        </IconButton>
                        <Menu
                           id='menu-appbar'
                           anchorEl={anchorEl}
                           anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                           }}
                           open={Boolean(anchorEl)}
                           onClose={handleClose}
                        >
                           <MenuItem onClick={handleClose}>Profile</MenuItem>
                           <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </Menu>
                     </>
                  ) : (
                     <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        sx={{ color: '#fff', marginLeft: '5px' }}
                     >
                        <Link
                           to='/login'
                           style={{ textDecoration: 'none', color: 'white' }}
                        >
                           Login
                        </Link>
                     </Button>
                  )}
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
