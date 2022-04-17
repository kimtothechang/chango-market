import styled from '@emotion/styled';

import SignLogo from '../../components/layouts/SignLogo';
import SelectType from '../../components/LoginJoin/SelectType';
import JoinForm from './JoinForm';
import JoinButton from './JoinButton';

const Join = () => {
  return (
    <JoinWrapper>
      <SignLogo />
      <FormWrapper>
        <SelectType leftText="구매회원가입" rightText="판매회원가입" />
        <JoinForm />
      </FormWrapper>
      <JoinButton />
    </JoinWrapper>
  );
};

export default Join;

const JoinWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 110px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  border: none;
  border-radius: 10px;
`;
