import React, { useContext, useState } from 'react'
import ShowProducts from './components/products/ShowProducts.jsx'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './components/products/ProductDetails.jsx'
import Cart from './components/Cart.jsx'
import Profile from './components/users/Profile.jsx'
import Login from './components/users/Login.jsx'
import Register from './components/users/Register.jsx'
import SearchProduct from './components/products/SearchProduct.jsx'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from './context/AppContext.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ShowProducts />}></Route>
        <Route path='/product/search/:term' element={<SearchProduct />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
