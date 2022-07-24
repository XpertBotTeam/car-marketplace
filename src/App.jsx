import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'
import Box from '@mui/material/Box'

function App() {
   return (
      <>
         <Router>
            <Header />
            <Routes>
               <Route path='/' element={<Home />} />
            </Routes>
         </Router>
      </>
   )
}

export default App
