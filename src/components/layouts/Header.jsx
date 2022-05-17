import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { useRecoilValue } from 'recoil';
import { myPageToggle } from '../../Atom';

import { BASIC_PAGE_WIDTH, ColorObject } from '../../constants';

const rowAreEqual = (prevProps, nextProps) => {
  return prevProps.children[1].props.value === nextProps.children[1].props.value;
};

const isToggleEqual = (prevProps, nextProps) => {
  console.log(prevProps, nextProps);
  return prevProps.children[2].props.toggle === nextProps.children[2].props.toggle;
};

const Header = ({ lefticon, righticon }) => {
  const [searchValue, setSearchValue] = useState('');

  const toggle = useRecoilValue(myPageToggle);

  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <MyHeader>
        <Row>
          <h1>
            <Logo src={`${process.env.PUBLIC_URL}/img/logo.png`} onClick={goHome} />
          </h1>
          <SearchInput type="text" value={searchValue} placeholder="상품을 검색해보세요" onChange={onChangeSearch} />
        </Row>
        <IconWrapper>
          {lefticon}
          {righticon}
          {localStorage.getItem('token') ? (
            <MyPage toggle={toggle}>
              <p>마이페이지</p>
              <p onClick={LogOut}>로그아웃</p>
            </MyPage>
          ) : (
            ''
          )}
        </IconWrapper>
      </MyHeader>
    </HeaderWrapper>
  );
};

export default Header;

const MyPage = styled.div`
  position: absolute;
  right: -1px;
  bottom: -100px;
  display: ${(props) => (props.toggle ? 'flex' : 'none')};
  box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 110px;
  border-radius: 10px;
  flex-direction: column;
  text-align: center;
  padding: 10px;
  z-index: 10;
  font-size: 16px;
  font-weight: 500;

  & > p:first-of-type {
    margin-bottom: 8px;
  }

  & > p {
    cursor: pointer;
    width: 90px;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
  }

  & > p:hover {
    border: 1px solid #767676;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`;

const MyHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${BASIC_PAGE_WIDTH};
  height: 90px;
  margin: 0px auto;
`;

const Row = memo(
  styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    width: 50%;

    & > h1 {
      width: 25%;
      margin-right: 30px;
    }
  `,
  rowAreEqual
);

const IconWrapper = memo(styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 25%;

  & > button {
    cursor: pointer;
  }
`);

const Logo = memo(styled.img`
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 80px;
  width: 100%;
  height: 38px;
`);

const SearchInput = memo(styled.input`
  width: 75%;
  min-width: 180px;
  max-width: 400px;
  text-indent: 22px;
  padding: 13px 0px;
  box-sizing: border-box;
  height: 46px;
  border: 2px solid ${ColorObject.basic};
  border-radius: 50px;

  &::placeholder {
    color: #767676;
    font-size: 14px;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`);
