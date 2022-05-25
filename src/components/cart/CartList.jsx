import styled from '@emotion/styled';

import CartItem from './CartItem';

import { BASIC_PAGE_WIDTH } from '../../constants';

const CartList = ({ setProducts, handleAllCheck, allCheck, products }) => {
  return (
    <CartListWrapper>
      <CartListHeader>
        <div>
          <input type="checkbox" onChange={handleAllCheck} value={allCheck} />
          <p>상품정보</p>
        </div>
        <div>
          <p>수량</p>
          <p>상품금액</p>
        </div>
      </CartListHeader>
      <CartListMain>
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
      </CartListMain>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
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

const CartListMain = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 70px;
`;
