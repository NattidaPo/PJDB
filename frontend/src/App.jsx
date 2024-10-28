import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/login'
import Mainpage from './components/mainpage'
import Register from './components/register'
import Navbar from './components/navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/mainpage" element={<Mainpage/>}/>
          <Route path="/register" element={<Register/>}/>
          
        </Routes>
      </Router>  
    </>
  )
}

export default App
