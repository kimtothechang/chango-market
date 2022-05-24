import styled from '@emotion/styled';

import DeliveryInfo from './DeliveryInfo';
import PaymentInfo from './PaymentInfo';

const OrderForm = () => {
  return (
    <FormWrapper>
      <DeliveryInfo />
      <PaymentInfo />
    </FormWrapper>
  );
};

export default OrderForm;

const FormWrapper = styled.section`
  margin-bottom: 358px;
`;
