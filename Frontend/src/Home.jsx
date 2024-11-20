import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Events from './components/Events'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

import "../src/styles/Home.css"

function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Hero></Hero>
    <Features></Features>
    <Events></Events>
    <Testimonials></Testimonials>
    <Footer></Footer>
    </>
    
  )
}

export default Home