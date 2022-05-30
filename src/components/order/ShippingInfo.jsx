import styled from '@emotion/styled';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { orderShippingInfo } from '../../store';

import Heading3 from './common/Heading3';
import AddressInput from './input/AddressInput';
import LongInput from './input/LongInput';
import MiddleInput from './input/MiddleInput';
import PhoneInput from './input/PhoneInput';

const ShippingInfo = () => {
  const [shippingInfo, setShippingInfo] = useRecoilState(orderShippingInfo);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = useCallback((e, type) => {
    setShippingInfo((current) => ({ ...current, [type]: e.target.value }));
  }, []);

  const handlePhone = useCallback((e, order) => {
    setShippingInfo((current) => {
      return { ...current, [`phone${order}`]: e.target.value };
    });
    setShippingInfo((current) => {
      return { ...current, phone: current.phone1 + current.phone2 + current.phone3 };
    });
  }, []);

  const handleAddress = useCallback((e) => {
    setShippingInfo((current) => {
      return { ...current, [`address2`]: e.target.value };
    });
    setShippingInfo((current) => {
      return { ...current, address: current.address1 + current.address2 };
    });
  }, []);

  const togglePopup = () => {
    setIsPopupOpen((current) => !current);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setShippingInfo((current) => {
      return { ...current, zipcode: data.zonecode, address1: fullAddr, address: fullAddr + current.address2 };
    });
    togglePopup();
  };

  return (
    <Wrapper>
      <Heading3 text="배송지 정보" />
      <MiddleInput text="이름" onChange={handleChange} type="name" value={shippingInfo.name} />
      <PhoneInput text="휴대폰" onChange={handlePhone} value1={shippingInfo.phone1} value2={shippingInfo.phone2} value3={shippingInfo.phone3} />
      <AddressInput
        text="배송주소"
        onToggle={togglePopup}
        toggle={isPopupOpen}
        zipcode={shippingInfo.zipcode}
        address1={shippingInfo.address1}
        address2={shippingInfo.address2}
        onCompletePost={onCompletePost}
        onChange={handleAddress}
      />
      <LongInput text="배송 메세지" onChange={handleChange} type="message" value={shippingInfo.message} />
    </Wrapper>
  );
};

export default ShippingInfo;

const Wrapper = styled.div``;
