import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { totalPayment } from '../../Atom';

import AmountControl from '../common/AmountControl';

import { ColorObject } from '../../constants';
import { fetcherBody } from '../../utils/fetcher';
import { Link } from 'react-router-dom';

const CartItem = ({
  cartId,
  productId,
  img,
  seller,
  product,
  price,
  stock,
  quantity,
  isActive,
  deleteItem,
  checkedProp,
  eachCheck,
  handleCheck,
  idx,
  quantityProp,
  quantitySet,
}) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [payment, setPayment] = useRecoilState(totalPayment);

  const increaseItem = async () => {
    if (productQuantity < 99 && productQuantity < stock) {
      await fetcherBody(`cart/${cartId}/`, 'PUT', {
        product_id: productId,
        quantity: productQuantity + 1,
        is_active: isActive,
      });

      quantitySet(1, idx);

      setProductQuantity((current) => current + 1);
      setPayment((current) => current + price);
    } else {
      alert('현재 상품의 재고가 부족합니다.');
    }
  };
  const decreaseItem = async () => {
    if (productQuantity > 1) {
      await fetcherBody(`cart/${cartId}/`, 'PUT', {
        product_id: productId,
        quantity: productQuantity - 1,
        is_active: isActive,
      });
      quantitySet(-1, idx);

      setProductQuantity((current) => current - 1);
      setPayment((current) => current - price);
    }
  };

  useEffect(() => {
    setProductQuantity((current) => (current = quantity));
  }, [quantity]);

  return (
    <CartItemWrapper>
      <ItemInfo>
        <input type="checkbox" onChange={() => handleCheck(idx)} checked={checkedProp || eachCheck} />
        <img src={img} alt="상품 사진" />
        <div>
          <p>{seller}</p>
          <p>{product}</p>
          <p>{price.toLocaleString()}원</p>
          <p>택배배송 / 무료배성</p>
        </div>
      </ItemInfo>
      <ItemControl>
        <div>
          <AmountControl value={quantityProp} increase={increaseItem} decrease={decreaseItem} />
          {/* <AmountControl value={productQuantity} increase={increaseItem} decrease={decreaseItem} /> */}
        </div>
        <div>
          <p>{(price * productQuantity).toLocaleString()}원</p>
          <BuyLink
            to="/order"
            state={[{ product_id: productId, image: img, seller_store: seller, product_name: product, amount: productQuantity, price, stock }]}
          >
            <button>주문하기</button>
          </BuyLink>
        </div>
      </ItemControl>
      <div onClick={() => deleteItem(cartId, idx)}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.14209 18.2842L18.2842 4.14204" stroke="#C4C4C4" strokeWidth="2" />
          <path d="M18.1421 18.1421L3.99995 3.99996" stroke="#C4C4C4" strokeWidth="2" />
        </svg>
      </div>
    </CartItemWrapper>
  );
};

CartItem.defaultProps = {
  cartId: '',
  productId: '',
  img: '',
  seller: '판매자',
  product: '상품 이름',
  price: '가격',
  quantity: '0',
  stock: '',
  isActive: '',
  checkedProp: '',
  eachCheck: '',
  idx: '',
};
export default CartItem;

const CartItemWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  border: 2px solid #e0e0e0;
  border-radius: 10px;

  & > div:last-of-type {
    position: absolute;
    top: 18px;
    right: 18px;
  }
`;

const ItemInfo = styled.div`
  width: 59%;
  display: flex;
  align-items: center;
  padding: 20px 30px;
  min-width: 400px;
  flex-grow: 1;

  & > img {
    margin-left: 40px;
    margin-right: 36px;
    width: 160px;
    height: 160px;
    border-radius: 10px;
  }

  & > div {
    & > p:first-of-type {
      color: #767676;
      font-size: 14px;
      font-weight: 400;
    }
    & > p:nth-of-type(2) {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 400;
    }
    & > p:nth-of-type(3) {
      font-size: 16px;
      font-weight: 700;
    }
    & > p:last-of-type {
      margin-top: 40px;
      color: #767676;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 979px) {
    & > img {
      margin-left: 60px;
    }
  }

  @media screen and (max-width: 560px) {
    & > img {
      margin-left: 20px;
    }
  }
`;

const ItemControl = styled.div`
  @media screen and (max-width: 979px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
  width: 41%;
  min-width: 400px;
  flex-grow: 1;

  & > div:first-of-type {
    display: flex;
    justify-content: center;
    width: 35%;

    @media screen and (max-width: 979px) {
      width: 35%;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;

    & > p {
      margin-bottom: 26px;
      font-size: 18px;
      font-weight: 700;
      color: #eb5757;
    }

    & > a > button {
      width: 130px;
      padding: 10px 0px;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 16px;
      font-weight: 500;
      background-color: ${ColorObject.basic};
      cursor: pointer;
    }
  }
`;

const BuyLink = styled(Link)`
  text-decoration: none;
  text-decoration-line: none;

  &:visited,
  &:active {
    color: white;
  }
`;
