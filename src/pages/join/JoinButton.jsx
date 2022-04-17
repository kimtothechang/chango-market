import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { joinState, joinTypeState, joinValidState } from '../../Atom';

import { BASIC_SERVER_URL } from '../../constants';

const JoinButton = () => {
  const joinInfo = useRecoilValue(joinState);
  const joinType = useRecoilValue(joinTypeState);
  const [joinValid, setJoinValid] = useRecoilState(joinValidState);
  const navigate = useNavigate();

  const validCheck = (type) => {
    if (type === 'BUYER') {
      for (let x in joinValid) {
        if (x !== 'company' && x !== 'store' && x !== 'companyCheck') {
          if (joinValid[x] === false) {
            return false;
          }
        }
      }
    } else {
      for (let x in joinValid) {
        if (joinValid[x] === false) {
          return false;
        }
      }
    }
    return true;
  };

  const signUp = async (type) => {
    const API_TYPE = {
      BUYER: 'signup/',
      SELEER: 'signup_seller/',
    };

    const sendingData = {
      username: joinInfo.id,
      password: joinInfo.pw,
      password2: joinInfo.pwCheck,
      phone_number: joinInfo.phone1 + joinInfo.phone2 + joinInfo.phone3,
      name: joinInfo.name,
    };

    if (type === 'SELLER') {
      sendingData.company_registration_number = joinInfo.company.split('-').join('');
      sendingData.store_name = joinInfo.store;
    }

    const res = await fetch(`${BASIC_SERVER_URL}/accounts/${API_TYPE[type]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(...sendingData),
    });

    const data = await res.json();
  };
  return (
    <div>
      <Button onClick={() => signUp(joinType)} disabled={!validCheck(joinType)} activated={!validCheck(joinType)}>
        가입하기
      </Button>
    </div>
  );
};

export default JoinButton;

const Button = styled.button`
  width: 480px;
  padding-top: 19px;
  padding-bottom: 19px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => {
    return props.activated ? '#c4c4c4' : '#21bf48';
  }};
  border: none;
  border-radius: 10px;
  margin-top: 34px;
`;
