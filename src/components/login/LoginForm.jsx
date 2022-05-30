import { useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { joinTypeState, loginInfoState, loginState } from '../../store';

import LoginInput from './LoginInput';
import { BASIC_SERVER_URL, ERROR_MESSAGE, ColorObject } from '../../constants';

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [logined, setLogined] = useRecoilState(loginState);
  const loginType = useRecoilValue(joinTypeState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onChangeID = useCallback(
    (e) => {
      setLoginInfo((current) => {
        return { ...current, id: e.target.value };
      });
    },
    [loginInfo.id]
  );

  const onChangePW = useCallback(
    (e) => {
      setLoginInfo((current) => {
        return { ...current, pw: e.target.value };
      });
    },
    [loginInfo.pw]
  );

  const Login = () => {
    if (checkInput()) {
      getLogin(loginInfo.id, loginInfo.pw);
    }
  };

  const checkInput = () => {
    if (loginInfo.id.length < 1) {
      setErrorMessage('id');
      return false;
    } else if (loginInfo.pw.length < 1) {
      setErrorMessage('pw');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const getLogin = async (id, pw) => {
    const url = BASIC_SERVER_URL;
    const res = await fetch(`${url}/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: id,
        password: pw,
        login_type: loginType,
      }),
    });

    const data = await res.json();

    if (!!data.FAIL_Message) {
      setErrorMessage('fail');
    } else {
      setErrorMessage('');
      localStorage.setItem('id', id);
      localStorage.setItem('token', data.token);
      // setLogin(true);
      setLogined((current) => {
        return !current;
      });
      navigate('/');
    }
  };

  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      Login();
    }
  };

  return (
    <InputWrapper onKeyPress={onCheckEnter}>
      <LoginInput type="text" placeholder="아이디" value={loginInfo.id} onChange={onChangeID} />
      <LoginInput type="password" placeholder="비밀번호" value={loginInfo.pw} onChange={onChangePW} />
      <Warning warning={errorMessage}>{ERROR_MESSAGE[errorMessage]}</Warning>
      <button onClick={() => Login()}>로그인</button>
    </InputWrapper>
  );
};

export default LoginForm;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px;
  border: 1px solid #c4c4c4;
  border-top: none;
  border-radius: 10px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;

  & > button {
    height: 60px;
    border: none;
    border-radius: 5px;
    background-color: ${ColorObject.basic};
    color: white;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const Warning = memo(styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px;
  margin: 0px;
  color: red;
  font-size: 14px;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`);
