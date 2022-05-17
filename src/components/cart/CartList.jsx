import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import CartItem from './CartItem';

import { BASIC_PAGE_WIDTH } from '../../constants';
import { fetcher, fetcherAuth, fetcherBody } from '../../utils/fetcher';

const CartList = () => {
  const [productItems, setProductItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addItem = async () => {
    const res = await fetcherBody('cart/', 'POST', {
      product_id: '2',
      quantity: 1,
      check: true,
    });

    console.log(res);
  };

  const getItems = async () => {
    const res = await fetcherAuth('cart/', 'GET');
    setCartItems((current) => [...current, ...res.results]);
  };

  const getProduct = async (data) => {
    if (!!data[0]) {
      // console.log(data[0].product_id);

      for (let product of data) {
        const res = await fetcher(`products/${product.product_id}`, 'GET');
        setProductItems((current) => [...current, { ...res }]);
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getProduct(cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log(cartItems);
    console.log(productItems);
  }, [productItems]);

  return (
    <CartListWrapper>
      <h2>장바구니</h2>
      <CartListHeader>
        <div>
          <input type="checkbox" />
          <p>상품정보</p>
        </div>
        <div>
          <p>수량</p>
          <p>상품금액</p>
        </div>
      </CartListHeader>
      <CartMain>
        {productItems.map((item, idx) => {
          return (
            <CartItem
              key={item.product_id}
              img={item.image}
              seller={item.seller_store}
              product={item.product_name}
              price={item.price}
              quantity={cartItems[idx] ? cartItems[idx].quantity : '0'}
            />
          );
        })}
      </CartMain>
      <TotalPrice>
        <div>
          <p>총 상품금액</p>
          <p>00000원</p>
        </div>
        <div>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="white" />
            <path d="M7.55566 16.5276H26.4446" stroke="#C4C4C4" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <p>상품 할인</p>
          <p>0원</p>
        </div>
        <div>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="white" />
            <path d="M7.55566 16.5276H26.4446" stroke="#C4C4C4" strokeWidth="2" />
            <path d="M17 26.4443L17 7.55545" stroke="#C4C4C4" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <p>배송비</p>
          <p>0원</p>
        </div>
        <div>
          <p>결제 예정 금액</p>
          <p>00000원</p>
        </div>
      </TotalPrice>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};

  & > h2 {
    margin-top: 54px;
    margin-bottom: 52px;
    font-size: 36px;
    font-weight: 700;
  }
`;

const CartListHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 19px;
  padding-bottom: 18px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
  background-color: #f2f2f2;

  & > div:first-of-type {
    display: flex;
    width: 59%;
    min-width: 377px;
    flex-grow: 1;

    & > input {
      max-width: 0%;
      flex-grow: 1;
    }
    & > p {
      text-align: center;
      max-width: 100%;
      flex-grow: 1;
    }
  }
  & > div:last-of-type {
    display: flex;
    justify-content: space-between;
    width: 41%;
    min-width: 377px;
    flex-grow: 1;

    & > p:first-of-type {
      text-align: center;
      width: 35%;
    }
    & > p:last-of-type {
      text-align: center;
      width: 60%;
    }
  }
`;

const CartMain = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 70px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 46px;
  padding-bottom: 42px;
  width: 100%;
  border-radius: 10px;
  background-color: #f2f2f2;
`;
