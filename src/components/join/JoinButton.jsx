import styled from '@emotion/styled';
import { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { joinState, joinTypeState, joinValidState } from '../../store';

import { BASIC_SERVER_URL, ColorObject } from '../../constants';

const JoinButton = () => {
  const joinInfo = useRecoilValue(joinState);
  const joinType = useRecoilValue(joinTypeState);
  const joinValid = useRecoilValue(joinValidState);
  const navigate = useNavigate();

  const validCheck = useCallback((type, value) => {
    if (type === 'BUYER') {
      for (let x in value) {
        if (x !== 'company' && x !== 'store' && x !== 'companyCheck') {
          if (value[x] === false) {
            return false;
          }
        }
      }
    } else {
      for (let x in value) {
        if (value[x] === false) {
          return false;
        }
      }
    }
    return true;
  }, []);

  const signUp = useCallback(
    async (type, value) => {
      const API_TYPE = {
        BUYER: 'signup/',
        SELLER: 'signup_seller/',
      };

      const sendingData = {
        username: value.id,
        password: value.pw,
        password2: value.pwCheck,
        phone_number: value.phone1 + value.phone2 + value.phone3,
        name: value.name,
      };

      if (type === 'SELLER') {
        sendingData.company_registration_number = value.company.split('-').join('');
        sendingData.store_name = value.store;
      }

      const res = await fetch(`${BASIC_SERVER_URL}/accounts/${API_TYPE[type]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...sendingData }),
      });

      const data = await res.json();

      if (data.phone_number.length > 11) {
        alert('해당 사용자 전화번호는 이미 존재합니다.');
      } else if (data.company_registration_number > 10) {
        alert('해당 사용자 사업자 등록번호는 이미 존재합니다.');
      } else if (data.stor_name > joinInfo.id.length) {
        alert('해당 스토어이름은 이미 존재합니다.');
      } else {
        alert('회원가입에 성공하였습니다.\n 로그인 후 이용해주세요.');
        navigate('/login', { replace: true });
      }
    },
    [joinType, joinInfo]
  );

  return (
    <div>
      <Button onClick={() => signUp(joinType, joinInfo)} disabled={!validCheck(joinType, joinValid)} activated={!validCheck(joinType, joinValid)}>
        가입하기
      </Button>
    </div>
  );
};

export default memo(JoinButton);

const Button = styled.button`
  width: 480px;
  padding-top: 19px;
  padding-bottom: 19px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => {
    return props.activated ? '#c4c4c4' : ColorObject.basic;
  }};
  border: none;
  border-radius: 10px;
  margin-top: 34px;
`;
