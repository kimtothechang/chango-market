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
  },
});

// 로그인 State
export const loginInfoState = atom({
  key: 'loginInfoState',
  default: {
    id: '',
    pw: '',
  },
});
