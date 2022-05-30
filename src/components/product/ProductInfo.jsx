import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { oneOrderState } from '../../store';

// Etc
import { fetcher } from '../../utils/fetcher';
import { BASIC_SERVER_URL, ColorObject } from '../../constants';

// Components
import MiddleButton from './MiddleButton';
import AmountControl from '../common/AmountControl';

const ProductInfo = () => {
  const navigate = useNavigate();
  const postId = useParams().id;
  const [productData, setProductData] = useState({
    price: 0,
  });
  const [amount, setAmount] = useState(1);
  const [oneOrder, setOneOrder] = useRecoilState(oneOrderState);
  const [isSoldOut, setIsSoldOut] = useState('');

  const getData = async () => {
    const res = await fetcher(`products/${postId}`, 'GET');
    setProductData((current) => {
      return { ...current, ...res };
    });
  };

  useEffect(() => {
    getData();
  }, [postId]);

  const addCard = async () => {
    if (productData.stock >= amount) {
      const url = BASIC_SERVER_URL;
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/cart/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ product_id: `${postId}`, quantity: amount, is_active: true }),
      });

      if (!res.ok && res.status === 401) {
        alert('로그인 후 이용해주세요.');
        return;
      }

      const data = await res.json();

      if (data !== undefined) {
        alert('장바구니에 추가되었습니다.');
      }
    } else {
      alert('상품 재고가 부족합니다.');
    }
  };

  const increaseItem = (stock) => {
    setAmount((current) => {
      if (current < stock) {
        setIsSoldOut('');
        return current + 1;
      } else {
        setIsSoldOut(`상품 재고가 부족합니다. 현재 재고: ${productData.stock}개`);
        return current;
      }
    });
  };

  const decreaseItem = () => {
    setAmount((current) => {
      if (current > 1) {
        setIsSoldOut('');
        return current - 1;
      } else {
        setIsSoldOut('');
        return current;
      }
    });
  };

  const sendOrder = () => {
    if (localStorage.getItem('token')) {
      setOneOrder({ product_id: productData.product_id, quantity: amount, shipping_fee: productData.shipping_fee, price: productData.price });

      navigate('/order', {
        state: {
          orderProducts: [
            {
              product_id: productData.product_id,
              image: productData.image,
              seller_store: productData.seller_store,
              product_name: productData.name,
              quantity: amount,
              price: productData.price,
              stock: productData.stock,
              shipping_fee: productData.shipping_fee,
            },
          ],
          order_kind: 'direct_order',
        },
      });
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };
  return (
    <ProductHeader>
      <div>
        <img src={productData.image} alt="상품 사진" />
      </div>
      <div>
        <p>{productData.seller_store}</p>
        <p>{productData.product_name}</p>
        <p>
          {productData.price.toLocaleString()}
          <span>원</span>
        </p>
        <p>택배배송 / {productData.shipping_fee > 0 ? `${productData.shipping_fee}원` : '무료 배송'}</p>
        <AmountWrapper>
          <Line />
          <div>
            <AmountControl value={amount} increase={() => increaseItem(productData.stock)} decrease={() => decreaseItem()} />
            <p>{isSoldOut}</p>
          </div>
          <Line />
        </AmountWrapper>
        <TotalWrapper>
          <div>
            <p>총 상품 금액</p>
          </div>
          <div>
            <p>
              총 수량 <span>{amount}</span>개
            </p>
            <div></div>
            <p>
              {(productData.price * amount).toLocaleString()}
              <span>원</span>
            </p>
          </div>
        </TotalWrapper>
        <HeaderButtonWrapper>
          <BuyButton onClick={() => sendOrder()}>바로 구매</BuyButton>
          <MiddleButton text="장바구니" onClick={addCard} color="#767676" />
        </HeaderButtonWrapper>
      </div>
    </ProductHeader>
  );
};

export default ProductInfo;

const AmountWrapper = styled.div`
  & > div:first-of-type {
    margin-bottom: 20px;
  }

  & > div:nth-of-type(2) {
    display: flex;
    align-items: center;

    & > div {
      margin-right: 32px;
    }

    & > p {
      color: red;
      font-weight: 500;
    }
  }

  & > div:last-of-type {
    margin-top: 20px;
  }
`;

const Line = styled.div`
  border: none;
  border-top: 2px solid #c4c4c4;
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 46px;
  margin-bottom: 30px;

  & > div:first-of-type {
    & > p {
      font-size: 18px;
      font-weight: 500;
    }
  }

  & > div:last-of-type {
    display: flex;
    align-items: center;

    & > p:first-of-type {
      font-size: 18px;
      font-weight: 400;

      & > span {
        font-weight: 700;
      }
    }

    & > div {
      margin-left: 11px;
      margin-right: 12px;
      height: 20px;
      border-right: 1px solid #c4c4c4;
    }

    & > p:last-of-type {
      color: ${ColorObject.basic};
      font-size: 36px;
      font-weight: 700;

      & > span {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
`;

const ProductHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 140px;

  & > div {
    width: 50%;
    flex-basis: 640px;
    flex-grow: 1;
  }

  & > div:last-of-type {
    @media screen and (max-width: 1280px) {
      padding: 24px;
    }

    padding-left: 50px;

    & > p:first-of-type {
      color: #767676;
      font-size: 18px;
      font-weight: 400;
    }

    & > p:nth-of-type(2) {
      margin-top: 16px;
      margin-bottom: 20px;
      font-size: 36px;
      font-weight: 400;
    }
    & > p:nth-of-type(3) {
      font-size: 36px;
      font-weight: 700;

      & > span {
        font-size: 18px;
        font-weight: 400;
      }
    }
    & > p:nth-of-type(4) {
      margin-top: 100px;
      margin-bottom: 20px;
      color: #767676;
      font-size: 16px;
      font-weight: 400;
    }
  }

  & > div > img {
    width: 100%;
    height: 530px;
  }
`;

const HeaderButtonWrapper = styled.div`
  display: flex;

  & > button:first-of-type {
    margin-right: 14px;
  }
`;

const BuyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
  padding-bottom: 19px;
  width: 416px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  background-color: ${ColorObject.basic};
  cursor: pointer;
`;
