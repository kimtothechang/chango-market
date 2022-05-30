import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Heading from '../components/common/Heading';
import ListTitle from '../components/order/ListTitle';
import OrderList from '../components/order/OrderList';
import OrderForm from '../components/order/OrderForm';

import { BASIC_PAGE_WIDTH } from '../constants';
import { useSetRecoilState } from 'recoil';
import { orderKindInfo } from '../store/common';

const OrderContainer = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState({
    orderProducts: [],
    order_kind: '',
  });
  const setOrderKindInfo = useSetRecoilState(orderKindInfo);

  useEffect(() => {
    setOrderData(location.state);
    setOrderKindInfo(location.state.order_kind);
  }, [location]);

  return (
    <div>
      <OrderWrapper>
        <section>
          <Heading title="주문/결제하기" />
          <ListTitle />
          <OrderList products={orderData.orderProducts} />
        </section>
        <OrderForm />
      </OrderWrapper>
    </div>
  );
};

export default OrderContainer;

const OrderWrapper = styled.div`
  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
`;
