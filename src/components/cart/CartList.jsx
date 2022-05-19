import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { totalPayment } from '../../Atom';

import CartItem from './CartItem';
import PriceInfo from './PriceInfo';
import MiddleButton from '../button/MiddleButton';

import { BASIC_PAGE_WIDTH, ColorObject } from '../../constants';
import { fetcher, fetcherAuth } from '../../utils/fetcher';

const CartList = () => {
  const [productItems, setProductItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [Payment, setPayment] = useRecoilState(totalPayment);

  const getItems = async () => {
    const res = await fetcherAuth('cart/', 'GET');
    setCartItems((current) => [...current, ...res.results]);
  };

  const getProduct = async (data) => {
    if (!!data[0]) {
      const arr = [];
      for (let product of data) {
        const res = await fetcher(`products/${product.product_id}`, 'GET');
        arr.push({ ...res });
      }
      setProductItems([...arr]);
    }
  };

  const getTotalPrice = (data, multiple) => {
    const res = data.map((item, idx) => item.price * multiple[idx].quantity);

    if (!!res) {
      if (res.length > 1) {
        setPayment((current) => (current = res.reduce((a, b) => a + b)));
      } else {
        setPayment((current) => (current = res));
      }
    } else {
      setPayment(0);
    }
  };

  const deleteItem = async (cartId) => {
    await fetcherAuth(`cart/${cartId}/`, 'DELETE');

    setCartItems((current) =>
      current.filter((item) => {
        console.log(cartId, item.cart_item_id);
        return cartId !== item.cart_item_id;
      })
    );
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getProduct(cartItems);
  }, [cartItems]);

  useEffect(() => {
    getTotalPrice(productItems, cartItems);
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
              cartId={cartItems[idx] ? cartItems[idx].cart_item_id : 0}
              productId={cartItems[idx] ? cartItems[idx].product_id : 0}
              isActive={cartItems[idx] ? cartItems[idx].is_active : 'true'}
              deleteItem={deleteItem}
            />
          );
        })}
      </CartMain>
      <TotalPrice>
        <PriceInfo title="총 상품금액" price={Payment} />
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/icon-minus-line.svg`} alt="" />
        </div>
        <PriceInfo title="상품 할인" price={0} />
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/icon-plus-line.svg`} alt="" />
        </div>
        <PriceInfo title="배송비" price={0} />
        <div>
          <p>결제 예정 금액</p>
          <p>
            {Payment.toLocaleString()}
            <span>원</span>
          </p>
        </div>
      </TotalPrice>
      <MiddleButton text="주문하기" color={ColorObject.basic} />
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

  & > button {
    margin-bottom: 160px;
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
  margin-bottom: 40px;
  padding-top: 46px;
  padding-bottom: 42px;
  width: 100%;
  border-radius: 10px;
  background-color: #f2f2f2;

  & > div:nth-of-type(2),
  div:nth-of-type(4) {
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      padding: 7.5px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: white;
    }
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > p:first-of-type {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 700;
    }
    & > p:last-of-type {
      color: #eb5757;
      font-size: 36px;
      font-weight: 700;

      & > span {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
`;
