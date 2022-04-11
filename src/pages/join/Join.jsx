import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { joinState, joinTypeState } from '../../Atom';

import SignLogo from '../../components/layouts/SignLogo';
import SelectType from '../../components/LoginJoin/SelectType';
import JoinForm from './JoinForm';
import { BASIC_SERVER_URL } from '../../constants';
import JoinButton from './JoinButton';

const Join = () => {
  const joinInfo = useRecoilValue(joinState);

  useEffect(() => {}, [joinInfo.id]);

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
