import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SelectType from '../components/common/SelectType';
import LoginForm from '../components/login/LoginForm';
import SignLogo from '../components/common/SignLogo';

const LoginContainer = () => {
  const navigate = useNavigate();

  const goJoin = useCallback(() => {
    navigate('/join');
  }, [navigate]);

  return (
    <Section>
      <SignLogo />
      <FormWrapper>
        <SelectType leftText="구매회원 로그인" rightText="판매회원 로그인" />
        <LoginForm />
      </FormWrapper>
      <SignUp onClick={goJoin}>회원가입</SignUp>
    </Section>
  );
};

export default LoginContainer;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 352px;
  border: none;
  border-radius: 10px;
`;

const SignUp = styled.p`
  margin-top: 30px;
  color: #6e6e6e;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
