import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import IconButton from '../IconButton';
import { BASIC_PAGE_WIDTH } from '../../constants';

const Header = ({ lefticon, righticon }) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <MyHeader>
        <Row>
          <h1>
            <Logo onClick={() => navigate('/')} />
          </h1>
          <SearchInput type="text" value="" placeholder="상품을 검색해보세요" />
        </Row>
        <Row>
          {lefticon}
          {righticon}
        </Row>
      </MyHeader>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`;

const MyHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  width: ${BASIC_PAGE_WIDTH};
  height: 90px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  & > button {
    cursor: pointer;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  margin-right: 30px;

  &:after {
    display: inline-block;
    content: '';
    width: 124px;
    height: 38px;
    background-image: url('../../img/logo.png');
    background-repeat: no-repeat;
  }
`;

const SearchInput = styled.input`
  text-indent: 22px;
  padding: 13px 0px;
  box-sizing: border-box;
  width: 400px;
  height: 46px;
  border: 2px solid #21bf48;
  border-radius: 50px;

  &::placeholder {
    color: #767676;
    font-size: 16px;
    font-weight: 400;
  }
`;
