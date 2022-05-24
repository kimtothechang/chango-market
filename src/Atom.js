import { atom } from 'recoil';

// 로그인 상태 State
export const loginState = atom({
  key: 'loginState',
  default: false,
});

// 회원가입 타입 State
export const joinTypeState = atom({
  key: 'joinTypeState',
  default: 'BUYER',
});

// 마이페이지 클릭 State
export const myPageToggle = atom({
  key: 'myPageToggle',
  default: false,
});

// 회원 가입 State
export const joinState = atom({
  key: 'joinState',
  default: {
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    phone: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
    email1: '',
    email2: '',
    company: '',
    store: '',
  },
});

export const joinValidState = atom({
  key: 'joinValidState',
  default: {
    id: false,
    idCheck: false,
    pw: false,
    pwCheck: false,
    name: false,
    phone: false,
    email: false,
    company: false,
    companyCheck: false,
    store: false,
    check: false,
  },
});

export const joinSellerState = atom({
  key: 'joinSellerState',
  dafualt: {
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    phone: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
    email1: '',
    email2: '',
    companyNumber: '',
    store: '',
  },
});

export const joinSellerValidState = atom({
  key: 'joinSellerValidState',
  default: {
    id: false,
    idCheck: false,
    pw: false,
    pwCheck: false,
    name: false,
    phone: false,
    email: false,
    compnayNumber: false,
    store: false,
    check: false,
  },
});

// 약관 동의
export const joinAgree = atom({
  key: 'joinAgree',
  dafault: false,
});

// 로그인 State
export const loginInfoState = atom({
  key: 'loginInfoState',
  default: {
    id: '',
    pw: '',
  },
});

// 장바구니 총 상품 금액
export const totalPayment = atom({
  key: 'totalPayment',
  default: 0,
});

// 최종 주문 상품 정보
export const finalOrderInfo = atom({
  key: 'finalOrderInfo',
  default: [],
});

// 최종 주문 시 주문자 정보
export const orderUserInfo = atom({
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
export const orderShippingInfo = atom({
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

export const orderKindInfo = atom({
  key: 'orderKindInfo',
  default: '',
});

export const oneOrderState = atom({
  key: 'oneOrderState',
  default: {
    product_id: 0,
    quantity: 0,
    shipping_fee: 0,
    price: 0,
  },
});
