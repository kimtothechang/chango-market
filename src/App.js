import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Cart from './pages/cart/Cart.jsx';
import Join from './pages/join/Join.jsx';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
