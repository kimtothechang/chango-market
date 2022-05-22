import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { finalOrderInfo, totalPayment } from '../../Atom';

import OrderItem from './OrderItem';

const CardList = ({ data }) => {
  const [product, setProduct] = useState([]);
  const [orderInfo, setOrderInfo] = useRecoilState(finalOrderInfo);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalFee, setTotalFee] = useRecoilState(totalPayment);

  const calculateTotalPrice = (data, setState) => {
    if (!!data) {
      data.forEach((item) => {
        setState((current) => {
          if (item.stock - item.amount >= 0) {
            return current + item.price * item.amount;
          } else {
            return current + 0;
          }
        });
      });
    }
  };

  useEffect(() => {
    setProduct(data);
    setOrderInfo(data);

    if (data !== []) {
      calculateTotalPrice(data, setTotalPrice);
    }
  }, [data]);

  useEffect(() => {
    setTotalFee(totalPrice);
  }, [totalPrice]);

  return (
    <ListWrapper>
      {!!product
        ? product.map((item) => (
            <OrderItem
              key={item.product_id}
              img={item.image}
              seller={item.seller_store}
              product={item.product_name}
              quantity={item.stock - item.amount >= 0 ? item.amount : `재고 부족, 현재 재고: ${item.stock}`}
              price={item.stock - item.amount >= 0 ? item.price * item.amount : 0}
              soldout={item.stock - item.amount >= 0}
            />
          ))
        : ''}
      <p>
        총 주문금액<span>{totalPrice.toLocaleString()}원</span>
      </p>
    </ListWrapper>
  );
};

export default CardList;

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
