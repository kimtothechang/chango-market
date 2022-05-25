import MainTemplate from '../components/layouts/MainTemplate';
import Header from '../components/layouts/Header';
import OrderContainer from '../container/OrderContainer';

const Order = () => {
  return (
    <MainTemplate header={<Header />}>
      <OrderContainer />
    </MainTemplate>
  );
};

export default Order;
