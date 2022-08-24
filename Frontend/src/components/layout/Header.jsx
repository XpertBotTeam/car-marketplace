import AccountCircle from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
   AppBar,
   Box,
   Button,
   Divider,
   Drawer,
   IconButton,
   Link,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Menu,
   MenuItem,
   Stack,
   Toolbar,
   Typography
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'

const navItems = [
   <Link
      component={RouterLink}
      to='/'
      variant='body2'
      sx={{ color: 'white', textDecoration: 'none' }}
   >
      Home
   </Link>,
   <Link
      component={RouterLink}
      to='/shop'
      variant='body2'
      sx={{ color: 'white', textDecoration: 'none' }}
   >
      Shop
   </Link>,
   <Link
      component={RouterLink}
      to='/about'
      variant='body2'
      sx={{ color: 'white', textDecoration: 'none' }}
   >
      About
   </Link>,
   <Link
      component={RouterLink}
      to='/contact'
      variant='body2'
      sx={{ color: 'white', textDecoration: 'none' }}
   >
      Contact
   </Link>,
]
const navDrawerItems = [
   <Link
      component={RouterLink}
      to='/'
      variant='body2'
      sx={{ color: 'black', textDecoration: 'none' }}
   >
      Home
   </Link>,
   <Link
      component={RouterLink}
      to='/shop'
      variant='body2'
      sx={{ color: 'black', textDecoration: 'none' }}
   >
      Shop
   </Link>,
   <Link
      component={RouterLink}
      to='/about'
      variant='body2'
      sx={{ color: 'black', textDecoration: 'none' }}
   >
      About
   </Link>,
   <Link
      component={RouterLink}
      to='/contact'
      variant='body2'
      sx={{ color: 'black', textDecoration: 'none' }}
   >
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
                           <MenuItem onClick={handleClose}>
                              <Link
                                 component={RouterLink}
                                 to='/profile'
                                 sx={{ textDecoration: 'none' }}
                              >
                                 Profile
                              </Link>
                           </MenuItem>
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
                           component={RouterLink}
                           to='/login'
                           variant='body2'
                           sx={{ color: 'white', textDecoration: 'none' }}
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
