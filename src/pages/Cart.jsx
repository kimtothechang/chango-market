import MainTemplate from '../components/layouts/MainTemplate';
import Header from '../components/layouts/Header';
import CartContainer from '../container/CartContainer';

const Cart = () => {
  return (
    <MainTemplate header={<Header />}>
      <CartContainer />
    </MainTemplate>
  );
};

export default Cart;
