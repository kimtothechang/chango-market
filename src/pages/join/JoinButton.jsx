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
  const [infoForCheck, setInfoForCheck] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setInfoForCheck({
      id: joinInfo.id,
      pw: joinInfo.pw,
      pwCheck: joinInfo.pwCheck,
      phone: joinInfo.phone1 + joinInfo.phone2 + joinInfo.phone3,
      email: joinInfo.email1 + '@' + joinInfo.email2,
    });
  }, [joinInfo]);

  // 1. 아이디 중복 검사
  // 2. 휴대폰 번호 중복 검사
  // 3. 유효성 검사
  // 4. API 호출

  // {username: ['해당 사용자 아이디는 이미 존재합니다.']}
  // {phone_number: ["해당 사용자 전화번호는 이미 존재합니다."]}

  const validCheck = () => {
    for (let x in joinValid) {
      if (joinValid[x] === false) {
        return false;
      }
    }
    return true;
  };

  const signUp = async () => {
    const url = BASIC_SERVER_URL;
    const res = await fetch(`${url}/accounts/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: joinInfo.id,
        password: joinInfo.pw,
        password2: joinInfo.pwCheck,
        phone_number: joinInfo.phone1 + joinInfo.phone2 + joinInfo.phone3,
        name: joinInfo.name,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.phone_number.length === 1) {
      alert(data.phone_number[0]);
    } else if (data.username.length === 1) {
      setJoinValid((current) => {
        return { ...current, idCheck: false };
      });
      alert(data.username[0]);
    } else {
      alert('회원 가입에 성공하였습니다.\n 로그인 후 이용해주세요.');
      navigate('/login');
    }
  };
  return (
    <div>
      <Button onClick={signUp} disabled={!validCheck()} activated={!validCheck()}>
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
