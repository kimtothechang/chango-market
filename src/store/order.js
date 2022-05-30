import { atom } from 'recoil';

// 최종 주문 시 주문자 정보
const orderUserInfo = atom({
  key: 'orderUserInfo',
  default: {
    name: '',
    phone: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
  },
});

// 최종 주문 시 배송지 정보 + 결제 수단 + 최종 동의
const orderShippingInfo = atom({
  key: 'orderShippingInfo',
  default: {
    name: '',
    phone: '',
    phone1: '',
    phone2: '',
    phone3: '',
    address: '',
    zipcode: '',
    address1: '',
    address2: '',
    message: '',
    payment: '',
    agree: false,
  },
});

export { orderUserInfo, orderShippingInfo };
