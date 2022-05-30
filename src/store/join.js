import { atom } from 'recoil';

// 회원가입 타입 State
const joinTypeState = atom({
  key: 'joinTypeState',
  default: 'BUYER',
});

// 회원 가입 State
const joinState = atom({
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

const joinValidState = atom({
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

const joinSellerState = atom({
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

const joinSellerValidState = atom({
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
const joinAgree = atom({
  key: 'joinAgree',
  dafault: false,
});

export { joinTypeState, joinState, joinValidState, joinSellerState, joinSellerValidState, joinAgree };
