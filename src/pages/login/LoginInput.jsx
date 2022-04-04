import { useState, memo } from 'react';
import styled from '@emotion/styled';
import { BASIC_SERVER_URL } from '../../constants';
import { useEffect } from 'react';
import { useCallback } from 'react';

const ERROR_MESSAGE = {
  id: '아이디를 입력해주세요.',
  pw: '비밀번호를 입력해주세요.',
  fail: '아이디 또는 비밀번호가 일치하지 않습니다.',
};

const LoginInput = ({ logintype }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeID = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePW = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const Login = () => {
    if (checkInput()) {
      getLogin(id, password);
    }
  };

  const checkInput = () => {
    if (id.length < 1) {
      setErrorMessage('id');
      return false;
    } else if (password.length < 1) {
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
        login_type: logintype,
      }),
    });

    const data = await res.json();

    if (!!data.FAIL_Message) {
      setErrorMessage('fail');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <InputWrapper>
      <IDinput type="text" placeholder="아이디" value={id} onChange={onChangeID} />
      <PWinput type="password" placeholder="비밀번호" value={password} onChange={onChangePW} warning={errorMessage} />
      <Warning warning={errorMessage}>{ERROR_MESSAGE[errorMessage]}</Warning>
      <button onClick={() => Login()}>로그인</button>
    </InputWrapper>
  );
};

export default LoginInput;

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
    background-color: #21bf48;
    color: white;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const IDinput = memo(styled.input`
  height: 60px;
  border: none;
  border-bottom: 1px solid #c4c4c4;
`);

const PWinput = memo(styled.input`
  height: 60px;
  border: none;
  border-bottom: 1px solid #c4c4c4;
  margin-bottom: ${(props) => (props.warning ? '26px' : '36px')};
`);

const Warning = styled.p`
  display: ${(props) => (props.warning ? 'block' : 'none')};
  color: red;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
