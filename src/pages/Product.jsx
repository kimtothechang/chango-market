import styled from '@emotion/styled';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { myPageToggle } from '../Atom';

import Header from '../components/layouts/Header';
import IconButton from '../components/common/IconButton';
import { fetcher } from '../utils/fetcher';
import { BASIC_PAGE_WIDTH, ColorObject } from '../constants';
import Footer from '../components/layouts/Footer';
import LongButton from '../components/button/LongButton';
import MiddleButton from '../components/button/MiddleButton';
import AmountControl from '../components/common/AmountControl';
import Contents from '../components/product/Contents';

const Product = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    price: 0,
  });
  const [toggle, setToggle] = useRecoilState(myPageToggle);
  const [amount, setAmount] = useState(1);

  const getData = async () => {
    const res = await fetcher(`products/${postId}`, 'GET');

    setProductData((current) => {
      return { ...current, ...res };
    });

    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const switchToggle = useCallback(() => {
    setToggle((current) => !current);
  }, []);

  const buyNow = () => {
    console.log('buynow~');
  };

  const addCard = () => {
    console.log('addCart~');
  };

  const increase = (value) => {
    return value !== 99 ? value + 1 : value;
  };

  const decrease = (value) => {
    return value !== 1 ? value - 1 : value;
  };

  return (
    <ProductContainer>
      {localStorage.getItem('token') ? (
        <Header
          lefticon={<IconButton onClick={() => navigate('/cart')} text="장바구니" src={`${process.env.PUBLIC_URL}/assets/icon-shopping-cart.svg`} />}
          righticon={<IconButton onClick={switchToggle} text="마이페이지" src={`${process.env.PUBLIC_URL}/assets/icon-user.svg`} />}
        />
      ) : (
        <Header
          lefticon={<IconButton text="장바구니" src={`${process.env.PUBLIC_URL}/assets/icon-shopping-cart.svg`} />}
          righticon={<IconButton onClick={() => navigate('/login')} text="로그인" src={`${process.env.PUBLIC_URL}/assets/icon-user.svg`} />}
        />
      )}
      <ProductWrapper>
        <ProductHeader>
          <div>
            <img src={productData.image} alt="상품 사진" />
          </div>
          <div>
            <p>{productData.seller_store}</p>
            <p>{productData.product_name}</p>
            <p>
              {productData.price}
              <span>원</span>
            </p>
            <p>택배배송 / 무료배송</p>
            <AmountWrapper>
              <Line />
              <AmountControl value={amount} increase={() => setAmount((curr) => increase(curr))} decrease={() => setAmount((curr) => decrease(curr))} />
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
                  {productData.price * amount}
                  <span>원</span>
                </p>
              </div>
            </TotalWrapper>
            <HeaderButtonWrapper>
              <LongButton text="바로 구매" onClick={buyNow} />
              <MiddleButton text="장바구니" onClick={addCard} color="#767676" />
            </HeaderButtonWrapper>
          </div>
        </ProductHeader>
        <ProductMain>
          <Contents info={productData.product_info} />
        </ProductMain>
      </ProductWrapper>
      <Footer />
    </ProductContainer>
  );
};

export default Product;

const ProductContainer = styled.main``;

const ProductWrapper = styled.section`
  margin: 0 auto;
  margin-top: 80px;
  max-width: ${BASIC_PAGE_WIDTH};
`;

const AmountWrapper = styled.div`
  & > div:first-of-type {
    margin-bottom: 20px;
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

const ProductMain = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
`;
