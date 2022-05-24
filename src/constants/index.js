// 미디어 쿼리 데스크탑 기본 값
const BASIC_PAGE_WIDTH = `1280px`;

// API 호출 URL
const BASIC_SERVER_URL = 'https://openmarket.weniv.co.kr';

// 로그인 유효성 검사 실패 시 문구
const ERROR_MESSAGE = {
  id: '아이디를 입력해주세요.',
  pw: '비밀번호를 입력해주세요.',
  fail: '아이디 또는 비밀번호가 일치하지 않습니다.',
};

// 회원가입 유효성 검사 정규표현식
const regxObj = {
  id: /^[A-za-z0-9]{4,20}$/,
  pw: /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
  pwCheck: /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
  name: /[a-zA-z0-9가-힣]/,
  phone: /([0-9]{11})/,
  email: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  company: /^[0-9]{10}$/,
  store: /[a-zA-z0-9가-힣]/,
};

const ColorObject = {
  basic: '#21bf48',
};

export { BASIC_PAGE_WIDTH, BASIC_SERVER_URL, ERROR_MESSAGE, regxObj, ColorObject };
