// 미디어 쿼리 데스크탑 기본 값
const BASIC_PAGE_WIDTH = `1280px`;

// API 호출 URL
const BASIC_SERVER_URL = 'http://13.209.150.154:8000';

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
  phone: /[0-9]{10,11}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
};

export { BASIC_PAGE_WIDTH, BASIC_SERVER_URL, ERROR_MESSAGE, regxObj };
