import { atom } from 'recoil';

// 로그인 State
const loginInfoState = atom({
  key: 'loginInfoState',
  default: {
    id: '',
    pw: '',
  },
});

export { loginInfoState };
