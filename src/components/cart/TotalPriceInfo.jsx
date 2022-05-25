import styled from '@emotion/styled';
import PriceInfo from './PriceInfo';

const TotalPriceInfo = ({ productsPrice, shippingPrice, totalPrice }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default TotalPriceInfo;

const Wrapper = styled.div`
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
