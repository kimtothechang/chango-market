import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './reset.css';

import { RecoilRoot } from 'recoil';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Cart from './pages/cart/Cart.jsx';
import Join from './pages/join/Join.jsx';
import Product from './pages/product/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/join" element={<Join />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
