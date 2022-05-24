import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import CartItem from './CartItem';
import PriceInfo from './PriceInfo';

import { BASIC_PAGE_WIDTH, ColorObject } from '../../constants';
import { fetcher, fetcherAuth } from '../../utils/fetcher';
import { Link } from 'react-router-dom';

const CartList = () => {
  const [products, setProducts] = useState([]);
  const [productsPrice, setProductsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);

  // 최초 페이지 접근 시 장바구니 내 상품 정보 불러오기
  useEffect(() => {
    const presetData = async () => {
      const cartInfo = await fetcherAuth('cart/', 'GET');
      const productInfo = [];
      for (let product of cartInfo.results) {
        const res = await fetcher(`products/${product.product_id}`, 'GET');
        productInfo.push({ ...product, ...res });
      }
      setProducts(productInfo);
    };

    presetData();
  }, []);

  const getProductsPrice = (products) => {
    let total = 0;
    if (products !== []) {
      for (let product of products) {
        total += product.price * product.quantity;
      }
    }

    return total;
  };
  const getShippingPrice = (products) => {
    let total = 0;
    if (products !== []) {
      for (let product of products) {
        total += product.shipping_fee;
      }
    }

    return total;
  };
  const getTotalPrice = (products) => {
    const total = getProductsPrice(products) + getShippingPrice(products);

    return total;
  };

  const getOrderProducts = (products) => {
    if (products !== []) {
      const temp = products.filter((product) => product.is_active);

      return temp;
    }
  };

  useEffect(() => {
    setProductsPrice(getProductsPrice(products));
    setShippingPrice(getShippingPrice(products));
    setTotalPrice(getTotalPrice(products));
    setOrderProducts(getOrderProducts(products));
  }, [products]);

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
        {products.map((product) => (
          <CartItem
            key={product.product_id}
            image={product.image}
            seller={product.seller_store}
            name={product.product_name}
            price={product.price}
            shippingFee={product.shipping_fee}
            quantity={product.quantity}
            setState={setProducts}
            cartId={product.cart_item_id}
            productId={product.product_id}
            stock={product.stock}
            isActive={product.is_active}
          />
        ))}
      </CartMain>
      <TotalPrice>
        <PriceInfo title="총 상품금액" price={productsPrice} />
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/icon-minus-line.svg`} alt="" />
        </div>
        <PriceInfo title="상품 할인" price={0} />
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/icon-plus-line.svg`} alt="" />
        </div>
        <PriceInfo title="배송비" price={shippingPrice} />
        <div>
          <p>결제 예정 금액</p>
          <p>
            {totalPrice.toLocaleString()}
            <span>원</span>
          </p>
        </div>
      </TotalPrice>
      <OrderLink to="/neworder" state={{ orderProducts, order_kind: 'cart_order' }}>
        <OrderButton>주문하기</OrderButton>
      </OrderLink>
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

const OrderLink = styled(Link)`
  margin-bottom: 100px;
  text-decoration: none;
  text-decoration-line: none;

  &:visited,
  &:active {
    color: white;
  }
`;

const OrderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
  padding-bottom: 19px;
  width: 200px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  background-color: ${ColorObject.basic};
  cursor: pointer;
`;
