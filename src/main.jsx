import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import Shop from './Pages/Shop.jsx';
import LoginSignUp from './Pages/LoginSignUp.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import NewCollections from './Components/NewCollections/NewCollections.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Shop />} />
      <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
      <Route path='/new-collections' element={<NewCollections />}/>
      <Route path='/product/:productId' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<LoginSignUp />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  </ShopContextProvider>
);
