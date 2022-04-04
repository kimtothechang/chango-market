import styled from '@emotion/styled';
import { useState } from 'react';
import LoginCategory from './LoginCategory';
import LoginInput from './LoginInput';
import LoginLogo from './LoginLogo';

const Login = () => {
  const [loginType, setLoginType] = useState('BUYER');

  const handleLoginType = () => {
    if (loginType === 'BUYER') {
      setLoginType('SELLER');
    } else {
      setLoginType('BUYER');
    }
  };

  return (
    <Section>
      <LoginLogo />
      <LoginForm>
        <LoginCategory logintype={loginType} onClick={handleLoginType} />
        <LoginInput logintype={loginType} />
      </LoginForm>
    </Section>
  );
};

export default Login;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 352px;
  border: none;
  border-radius: 10px;
`;
