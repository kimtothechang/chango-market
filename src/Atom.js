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
