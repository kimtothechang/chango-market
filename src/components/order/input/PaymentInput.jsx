import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { orderShippingInfo } from '../../../store';

const PaymentInput = () => {
  const setShippingInfo = useSetRecoilState(orderShippingInfo);

  const handlePayment = (value) => {
    setShippingInfo((current) => {
      return { ...current, payment: value };
    });
  };

  return (
    <InputWrapper>
      <label>
        <input type="radio" name="payment" onClick={() => handlePayment('CARD')} />
        신용/체크카드
      </label>
      <label>
        <input type="radio" name="payment" onClick={() => handlePayment('DEPOSIT')} />
        무통장 입금
      </label>
      <label>
        <input type="radio" name="payment" onClick={() => handlePayment('PHONE_PAYMENT')} />
        휴대폰 결제
      </label>
      <label>
        <input type="radio" name="payment" onClick={() => handlePayment('NAVERPAY')} />
        네이버페이
      </label>
      <label>
        <input type="radio" name="payment" onClick={() => handlePayment('KAKAOPAY')} />
        카카오페이
      </label>
    </InputWrapper>
  );
};

export default PaymentInput;

const InputWrapper = styled.div`
  margin-bottom: 300px;
  padding: 18px;
  border-bottom: 2px solid #c4c4c4;

  & > input {
    margin-right: 10px;
  }

  & > label {
    margin-right: 20px;
    white-space: nowrap;
  }
`;
