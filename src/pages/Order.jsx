import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/layouts/Header';
import Heading from '../components/common/Heading';
import ListTitle from '../components/order/ListTitle';
import OrderList from '../components/order/OrderList';
import OrderForm from '../components/order/OrderForm';

import { BASIC_PAGE_WIDTH } from '../constants';
import { useSetRecoilState } from 'recoil';
import { orderKindInfo } from '../Atom';

const Order = () => {
  const [orderData, setOrderData] = useState({
    orderProducts: [],
    order_kind: '',
  });
  const location = useLocation();
  const setOrderKindInfo = useSetRecoilState(orderKindInfo);

  useEffect(() => {
    setOrderData(location.state);
    setOrderKindInfo(location.state.order_kind);
  }, [location]);

  return (
    <OrderLayout>
      <Header />
      <OrderWrapper>
        <section>
          <Heading title="주문/결제하기" />
          <ListTitle />
          <OrderList products={orderData.orderProducts} />
        </section>
        <OrderForm />
      </OrderWrapper>
    </OrderLayout>
  );
};

export default Order;

const OrderLayout = styled.main``;

const OrderWrapper = styled.div`
  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
`;
