import styled from '@emotion/styled';

import SignLogo from '../components/common/SignLogo';
import SelectType from '../components/common/SelectType';
import JoinForm from '../components/join/JoinForm';
import JoinButton from '../components/join/JoinButton';
import CheckRule from '../components/join/CheckRule';

const JoinContainer = () => {
  return (
    <JoinWrapper>
      <SignLogo />
      <FormWrapper>
        <SelectType leftText="구매회원가입" rightText="판매회원가입" />
        <JoinForm />
      </FormWrapper>
      <CheckRule />
      <JoinButton />
    </JoinWrapper>
  );
};

export default JoinContainer;

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
