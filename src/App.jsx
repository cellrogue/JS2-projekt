import React from 'react'
import { Navbar } from './components/navbar'
import { Home } from './pages/home/home'
import { Route, Routes } from 'react-router-dom'
import {ProductDetails} from './pages/productDetails/productDetails'
import Contact from './pages/contact/contact'
import Footer from './components/footer'
import { Checkout } from './pages/checkout/checkout'

export const App = () => {
  return (
    <>
    <Navbar />
    <main>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/productDetails/:productId' element={<ProductDetails />}/>
        <Route path='/checkout' element={<Checkout />}/>
      </Routes>
    </main>
    <Footer />
    </>
  )
}
