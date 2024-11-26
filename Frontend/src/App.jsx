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
import AddEventPage from './AddEventPage';
import Dashboard from './Dashboard';
import UpdateEventForm from './components/UpdateEventForm';
import UpdateUserForm from './components/UpdateUserForm';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/event' element={<EventsPage/>} />
    <Route path="/eventdetail/:id" element={<EventDetailsPage />} />
    <Route path='/Payconfirmation' element={<PaymentConfirmation/>} />
    <Route path='/Payment' element={<PaymentPage/>} />
    <Route path='/CardPayment' element={<CardPaymentPage/>} />
    <Route path='/Contact-us' element={<ContactUs/>} />
    <Route path='/add-event' element={<AddEventPage/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/update-event/:id' element={<UpdateEventForm />} />
    <Route path='/update-user/:id' element={<UpdateUserForm/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App