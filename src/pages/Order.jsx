import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/layouts/Header';
import Heading from '../components/common/Heading';
import ListTitle from '../components/order/ListTitle';
import OrderList from '../components/order/OrderList';
import OrderForm from '../components/order/OrderForm';

import { BASIC_PAGE_WIDTH } from '../constants';

// 구조
// 📦 Order
//  ┣ 📜 Header
//  ┗ 📜 OrderWrapper
//    ┣ 📜 section
//    ┃ ┣ 📜 Heading
//    ┃ ┣ 📜 ListTitle
//    ┃ ┗ 📜 OrderList
//    ┃   ┣ OrderItem
//    ┃   ┗ p
//    ┗ 📜 OrderForm
//      ┣ 📜 DeliveryInfo
//      ┃ ┣ 📜 Heading
//      ┃ ┣ 📜 UserInfo
//      ┃ ┗ 📜 ShippingInfo
//      ┗ 📜 PaymentInfo

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setOrderData(location.state);
  }, [location]);

  return (
    <OrderLayout>
      <Header />
      <OrderWrapper>
        <section>
          <Heading title="주문/결제하기" />
          <ListTitle />
          <OrderList data={orderData} />
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
