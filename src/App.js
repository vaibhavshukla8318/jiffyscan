import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import './App.css'

const App = () => {
  return (
   <BrowserRouter basename='jiffyscan'>
     <Routes>
       <Route path="/" element={<Home/>} />
     </Routes>
   </BrowserRouter>
  )
}

export default App