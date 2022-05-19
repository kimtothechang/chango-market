import styled from '@emotion/styled';

const PriceInfo = ({ title, price }) => {
  return (
    <PriceInfoWrapper>
      <p>{title}</p>
      <p>
        {price.toLocaleString()}
        <span>원</span>
      </p>
    </PriceInfoWrapper>
  );
};

export default PriceInfo;

const PriceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p:first-of-type {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 400;
  }
  & > p:last-of-type {
    font-size: 24px;
    font-weight: 700;
    & > span {
      font-size: 16px;
      font-weight: 400;
    }
  }
`;
