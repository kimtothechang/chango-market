import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Cart from '../pages/Cart.jsx';
import Join from '../pages/Join.jsx';
import Product from '../pages/Product';
import Order from '../pages/Order';
import NotFound from '../pages/NotFound';

const routes = [
  {
    key: 0,
    path: '/',
    element: <Home />,
  },
  {
    key: 1,
    path: '/login',
    element: <Login />,
  },
  {
    key: 2,
    path: '/join',
    element: <Join />,
  },
  {
    key: 3,
    path: '/product',
    element: <Product />,
  },
  {
    key: 4,
    path: '/cart',
    element: <Cart />,
  },
  {
    key: 5,
    path: '/order',
    element: <Order />,
  },
  {
    key: 6,
    path: '*',
    element: <NotFound />,
  },
];

export { routes };
