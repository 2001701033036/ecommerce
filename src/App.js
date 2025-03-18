
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/home';
import ProductDetail from './pages/ProductDetail';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import the new version of the router components
import 'font-awesome/css/font-awesome.min.css';
import { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify'
import Cart from './pages/Cart';

function App() {
  const [cartItems,setCartItems]=useState([]);
  return (
    <div className="App">

      <Router>
        <div >
          <ToastContainer theme='dark' position='top-center'/>
          <Header cartItems={cartItems}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>}/>
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>


            
          </Routes>
        </div>
      </Router>
      <Footer />

    </div>
  );
}

export default App;
