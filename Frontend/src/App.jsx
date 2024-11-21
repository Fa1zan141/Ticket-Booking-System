import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import EventsPage from './EventsPage';
import EventDetailsPage from './EventDetailsPage';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentPage from './PaymentPage';
import CardPaymentPage from './CardPaymentPage';
import ContactUs from './ContactUs';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/event' element={<EventsPage/>} />
    <Route path='/eventdetail' element={<EventDetailsPage/>} />
    <Route path='/Payconfirmation' element={<PaymentConfirmation/>} />
    <Route path='/Payment' element={<PaymentPage/>} />
    <Route path='/CardPayment' element={<CardPaymentPage/>} />
    <Route path='/Contact-us' element={<ContactUs/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App