import { atom } from 'recoil';

// 전역
// 로그인 상태 State
const loginState = atom({
  key: 'loginState',
  default: false,
});

// 마이페이지 클릭 State
const myPageToggle = atom({
  key: 'myPageToggle',
  default: false,
});

// 상품 상세, 장바구니, 주문
// 장바구니 총 상품 금액
const totalPayment = atom({
  key: 'totalPayment',
  default: 0,
});

// 최종 주문 상품 정보
const finalOrderInfo = atom({
  key: 'finalOrderInfo',
  default: [],
});

const orderKindInfo = atom({
  key: 'orderKindInfo',
  default: '',
});

const oneOrderState = atom({
  key: 'oneOrderState',
  default: {
    product_id: 0,
    quantity: 0,
    shipping_fee: 0,
    price: 0,
  },
});

export { loginState, myPageToggle, totalPayment, finalOrderInfo, orderKindInfo, oneOrderState };
