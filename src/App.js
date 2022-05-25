import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

import ScrollToTop from './utils/ScrollToTop';
import './reset.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {routes.map((page) => (
          <Route key={page.key} path={page.path} element={page.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
