import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
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
               </Routes>
               <Footer />
            </Router>
         </ThemeProvider>
      </>
   )
}

export default App
