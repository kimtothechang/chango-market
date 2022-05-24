import styled from '@emotion/styled';

const OrderItem = ({ img, seller, product, quantity, price, soldout }) => {
  return (
    <ItemWrapper soldout={soldout}>
      <div>
        <img src={img} alt="상품 사진" />
        <div>
          <p>{seller}</p>
          <p>{product}</p>
          <p>수량 : {quantity}개</p>
        </div>
      </div>
      <div>
        <p>-</p>
        <p>무료배송</p>
        <p>{(price * 1).toLocaleString()}원</p>
      </div>
    </ItemWrapper>
  );
};

export default OrderItem;

const ItemWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  border-bottom: 1px solid #c4c4c4;

  & > div:first-of-type {
    display: flex;
    width: 45%;
    min-width: 400px;
    flex-grow: 1;

    & > img {
      margin-right: 36px;
      width: 104px;
      height: 104px;
      border-radius: 10px;
    }

    & > div {
      & > p:first-of-type {
        margin-top: 12px;
        color: #767676;
        font-size: 14px;
        font-weight: 400;
      }
      & > p:nth-of-type(2) {
        margin-top: 6px;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400;
      }
      & > p:last-of-type {
        color: ${(props) => (props.soldout ? '#767676' : 'red')};
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  & > div:last-of-type {
    display: flex;
    justify-content: space-between;
    width: 55%;
    min-width: 400px;
    flex-grow: 1;

    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.3%;
    }

    & > p:first-of-type {
      color: #767676;
      font-size: 18px;
      font-weight: 400;
    }
    & > p:nth-of-type(2) {
      color: #767676;
      font-size: 18px;
      font-weight: 400;
    }
    & > p:last-of-type {
      font-size: 18px;
      font-weight: 700;
    }
  }
`;
