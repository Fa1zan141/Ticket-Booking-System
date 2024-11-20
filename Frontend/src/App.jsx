import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App