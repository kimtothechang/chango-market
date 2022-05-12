import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './reset.css';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';
import Join from './pages/Join.jsx';
import Product from './pages/Product';

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
