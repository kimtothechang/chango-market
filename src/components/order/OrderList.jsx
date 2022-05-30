import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { totalPayment } from '../../store';

import OrderItem from './OrderItem';

const NewCardList = ({ products }) => {
  const [totalPrice, setTotalPrice] = useRecoilState(totalPayment);

  const getTotalPrice = (products) => {
    let temp = 0;
    if (products !== []) {
      for (let product of products) {
        temp += product.price * product.quantity + product.shipping_fee;
      }
    }
    return temp;
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice(products));
  }, [products]);

  return (
    <ListWrapper>
      {products.map((item) => (
        <OrderItem
          key={item.product_id}
          img={item.image}
          seller={item.seller_store}
          product={item.product_name}
          quantity={item.stock - item.quantity >= 0 ? item.quantity : `재고 부족, 현재 재고: ${item.stock}`}
          price={item.stock - item.quantity >= 0 ? item.price * item.quantity + item.shipping_fee : 0}
          soldout={item.stock - item.quantity >= 0}
        />
      ))}
      <p>
        총 주문금액<span>{totalPrice.toLocaleString()}원</span>
      </p>
    </ListWrapper>
  );
};

export default NewCardList;

const ListWrapper = styled.ul`
  & > p:last-of-type {
    text-align: right;
    margin-top: 30px;
    margin-bottom: 96px;
    font-size: 18px;
    font-weight: 500;

    & > span {
      margin-left: 10px;
      color: #eb5757;
      font-size: 24px;
      font-weight: 700;
    }
  }
`;
