import styled from '@emotion/styled';

import Heading2 from './common/Heading2';
import FinalPayment from './FinalPayment';
import PaymentInput from './input/PaymentInput';

const PaymentInfo = () => {
  return (
    <PaymentInfoWrapper>
      <div>
        <Heading2 text="결제수단" />
        <PaymentInput />
      </div>
      <div>
        <Heading2 text="최종결제 정보" />
        <FinalPayment />
      </div>
    </PaymentInfoWrapper>
  );
};

export default PaymentInfo;

const PaymentInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > div:first-of-type {
    width: 55%;
  }
  & > div:last-of-type {
    width: 40%;

    & > h2 {
      border-bottom: none;
    }
  }
`;
