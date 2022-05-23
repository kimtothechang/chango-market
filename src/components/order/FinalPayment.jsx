import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderShippingInfo, orderUserInfo, totalPayment } from '../../Atom';

import PaymentSummary from './common/PaymentSummary';

import { ColorObject } from '../../constants';
import { BASIC_SERVER_URL } from '../../constants';

const FinalPayment = () => {
  const totalPrice = useRecoilValue(totalPayment);
  const userInfo = useRecoilValue(orderUserInfo);
  const [shippingInfo, setShippingInfo] = useRecoilState(orderShippingInfo);
  const [approve, setApprove] = useState(false);

  const handleAgree = () => {
    setShippingInfo((current) => {
      return { ...current, agree: !current.agree };
    });
  };

  const LiveValidCheck = (data1, data2) => {
    if (!!data1) {
      for (let key in data1) {
        if (!data1[key]) {
          setApprove(false);
          return;
        }
      }
    }
    if (!!data2) {
      for (let key in data2) {
        if (!data2[key]) {
          setApprove(false);
          return;
        }
      }
    }
    setApprove(true);
    return;
  };

  const sendOrder = async (user, price) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASIC_SERVER_URL}/order/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        total_price: price,
        order_kind: 'cart_order',

        receiver: user.name,
        receiver_phone_number: user.phone,
        address: user.address,
        address_message: user.message,
        payment_method: user.payment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data) {
        alert('올바른 휴대폰 값을 입력해주세요.');
      }
    }

    console.log(data);
  };

  useEffect(() => {
    LiveValidCheck(userInfo, shippingInfo);
  }, [userInfo, shippingInfo]);

  return (
    <FinalPaymentWrapper buttonColor={approve}>
      <div>
        <PaymentSummary text="상품금액" price={totalPrice} />
        <PaymentSummary text="할인금액" price="0" />
        <PaymentSummary text="배송비" price="0" />
        <Line />
        <PaymentSummary text="결제금액" price={totalPrice} color="#eb5757" size="24px" weight="700" />
      </div>
      <div>
        <div>
          <label>
            <input type="checkbox" checked={shippingInfo.agree} onChange={() => handleAgree()} />
            주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </label>
        </div>
        <div>
          <button onClick={() => sendOrder(shippingInfo, totalPrice)} disabled={!approve}>
            결제하기
          </button>
        </div>
      </div>
    </FinalPaymentWrapper>
  );
};

export default FinalPayment;

const FinalPaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 30px;
  border: 2px solid ${ColorObject.basic};
  border-radius: 10px;

  & > div:first-of-type {
    overflow: hidden;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;

    & > div:first-of-type {
      display: flex;
      align-items: center;

      & > label {
        font-size: 16px;
        font-weight: 400;
      }
      & > label > input {
        margin-right: 10px;
      }
    }
    & > div:last-of-type {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      & > button {
        padding: 19px 65.5px;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 24px;
        font-weight: 700;
        background-color: ${(props) => (props.buttonColor ? ColorObject.basic : '#c4c4c4')};
      }
    }
  }
`;

const Line = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 29px;
  border-bottom: 1px solid #c4c4c4;
`;
