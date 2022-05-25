import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Heading from '../components/common/Heading';
import CartList from '../components/cart/CartList';
import TotalPriceInfo from '../components/cart/TotalPriceInfo';

import { BASIC_PAGE_WIDTH, ColorObject } from '../constants';
import { fetcher, fetcherAuth, fetcherBody } from '../utils/fetcher';

const CartContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsPrice, setProductsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);
  const [allCheck, setAllCheck] = useState(false);

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

  const getAllCheck = async (products) => {
    if (allCheck) {
      for (let product of products) {
        await fetcherBody(`cart/${product.cart_item_id}/`, 'PUT', {
          product_id: product.product_id,
          quantity: product.quantity,
          is_active: true,
        });
      }

      setProducts((current) => current.map((product) => ({ ...product, is_active: true })));
    } else {
      for (let product of products) {
        await fetcherBody(`cart/${product.cart_item_id}/`, 'PUT', {
          product_id: product.product_id,
          quantity: product.quantity,
          is_active: false,
        });
      }

      setProducts((current) => current.map((product) => ({ ...product, is_active: false })));
    }
  };

  const handleAllCheck = () => {
    setAllCheck((current) => !current);
  };

  useEffect(() => {
    getAllCheck(products);
  }, [allCheck]);

  useEffect(() => {
    setProductsPrice(getProductsPrice(products));
    setShippingPrice(getShippingPrice(products));
    setTotalPrice(getTotalPrice(products));
    setOrderProducts(getOrderProducts(products));
  }, [products]);

  return (
    <CartListWrapper>
      <Heading title="장바구니" />
      <CartList setProducts={setProducts} handleAllCheck={handleAllCheck} allCheck={allCheck} products={products} />
      <TotalPriceInfo productsPrice={productsPrice} shippingPrice={shippingPrice} totalPrice={totalPrice} />
      <OrderLink to="/order" state={{ orderProducts, order_kind: 'cart_order' }}>
        <OrderButton>주문하기</OrderButton>
      </OrderLink>
    </CartListWrapper>
  );
};

export default CartContainer;

const CartListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
`;

const OrderLink = styled(Link)`
  margin-bottom: 160px;
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
