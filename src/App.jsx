import { createTheme, ThemeProvider } from '@mui/material'
import { purple } from '@mui/material/colors'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Shop from './pages/Shop'

function App() {
   const theme = createTheme({
      palette: {
         primary: {
            // Purple and green play nicely together.
            main: '#292930',
         },
         secondary: {
            // This is green.A700 as hex.
            main: '#3EB650',
         },
      },
   })

   return (
      <>
         <ThemeProvider theme={theme}>
            <Router>
               <Header />
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
               </Routes>
               <Footer />
            </Router>
         </ThemeProvider>
      </>
   )
}

export default App
