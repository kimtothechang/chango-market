import styled from '@emotion/styled';

const PaymentSummary = ({ text, price, color, size, weight }) => {
  return (
    <PaymentSummaryWrapper color={color} size={size} weight={weight}>
      <p>- {text}</p>
      <p>
        {(price * 1).toLocaleString()}
        <span>원</span>
      </p>
    </PaymentSummaryWrapper>
  );
};

PaymentSummary.defaultProps = {
  color: 'black',
  size: '18px',
  weight: '700',
};

export default PaymentSummary;

const PaymentSummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  & > p:first-of-type {
    font-size: 16px;
    font-weight: 400;
  }
  & > p:last-of-type {
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => props.weight};

    & > span {
      margin-left: 4px;
      color: #767676;
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
