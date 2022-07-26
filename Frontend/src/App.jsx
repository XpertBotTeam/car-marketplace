import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import PrivateRoute from './components/PrivateRoute'
import About from './pages/About'
import Contact from './pages/Contact'
import CreateListing from './pages/CreateListing'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Shop from './pages/Shop'
import themeMui from './themeMUI'

function App() {
   return (
      <>
         <ThemeProvider theme={themeMui}>
            <Router>
               <Header />
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/profile' element={<PrivateRoute />}>
                     <Route path='/profile' element={<Profile />} />
                  </Route>
                  <Route path='/newcar' element={<PrivateRoute />}>
                     <Route path='/newcar' element={<CreateListing />} />
                  </Route>
               </Routes>
               <Footer />
            </Router>
            <ToastContainer />
         </ThemeProvider>
      </>
   )
}

export default App
