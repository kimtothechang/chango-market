import './reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
