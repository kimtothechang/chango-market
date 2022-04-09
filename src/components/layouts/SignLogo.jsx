import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const SignLogo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <LogoImg onClick={() => navigate('/')} src={`${process.env.PUBLIC_URL}/img/logo-big.png`} alt="logo" />
    </div>
  );
};

export default React.memo(SignLogo);

const LogoImg = styled.img`
  margin-top: 100px;
  margin-bottom: 70px;
  width: 238px;
  height: 74px;
  cursor: pointer;
`;
