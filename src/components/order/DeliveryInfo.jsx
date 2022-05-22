import styled from '@emotion/styled';

import Heading2 from './common/Heading2';
import ShippingInfo from './ShippingInfo';
import UserInfo from './UserInfo';

const DeliveryInfo = () => {
  return (
    <DeliveryWrapper>
      <Heading2 text="배송 정보" />
      <UserInfo />
      <ShippingInfo />
    </DeliveryWrapper>
  );
};

export default DeliveryInfo;

const DeliveryWrapper = styled.article`
  margin-bottom: 70px;
`;
