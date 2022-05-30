import loadable from '@loadable/component';

import Home from '../pages/Home.jsx';
const Login = loadable(() => import('../pages/Login.jsx'), {
  fallback: <div>loading..</div>,
});
const Cart = loadable(() => import('../pages/Cart.jsx'), {
  fallback: <div>loading..</div>,
});
const Join = loadable(() => import('../pages/Join.jsx'), {
  fallback: <div>loading..</div>,
});
const Product = loadable(() => import('../pages/Product.jsx'), {
  fallback: <div>loading..</div>,
});
const Order = loadable(() => import('../pages/Order.jsx'), {
  fallback: <div>loading..</div>,
});
const NotFound = loadable(() => import('../pages/NotFound.jsx'), {
  fallback: <div>loading..</div>,
});

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
    path: '/products:id',
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
