import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { useRecoilValue } from 'recoil';
import { myPageToggle } from '../../Atom';

import { BASIC_PAGE_WIDTH } from '../../constants';

const rowAreEqual = (prevProps, nextProps) => {
  return prevProps.children[1].props.value === nextProps.children[1].props.value;
};

const iconsAreEqual = (prevProps, nextProps) => {
  return prevProps.children[0].props.text === nextProps.children[0].props.text;
};

const isToggleEqual = (prevProps, nextProps) => {
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
            <Logo onClick={goHome} />
          </h1>
          <SearchInput type="text" value={searchValue} placeholder="상품을 검색해보세요" onChange={onChangeSearch} />
        </Row>
        {localStorage.getItem('token') ? (
          <MyPageWrapper>
            {lefticon}
            {righticon}
            <MyPage toggle={toggle}>
              <p>마이페이지</p>
              <p onClick={LogOut}>로그아웃</p>
            </MyPage>
          </MyPageWrapper>
        ) : (
          <IconWrapper>
            {lefticon}
            {righticon}
          </IconWrapper>
        )}
      </MyHeader>
    </HeaderWrapper>
  );
};

export default Header;

const MyPage = styled.div`
  position: absolute;
  right: -32.5px;
  bottom: -100px;
  display: ${(props) => (props.toggle ? 'flex' : 'none')};
  box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 130px;
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
    width: 110px;
    padding: 10px;
    border-radius: 5px;
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
  margin: 0px auto;
  width: ${BASIC_PAGE_WIDTH};
  height: 90px;
`;

const Row = memo(
  styled.div`
    display: flex;
    align-items: center;

    & > button {
      cursor: pointer;
    }
  `,
  rowAreEqual
);

const IconWrapper = memo(
  styled.div`
    position: relative;
    display: flex;
    align-items: center;

    & > button {
      cursor: pointer;
    }
  `,
  iconsAreEqual
);

const MyPageWrapper = memo(
  styled.div`
    position: relative;
    display: flex;
    align-items: center;

    & > button {
      cursor: pointer;
    }
  `,
  isToggleEqual
);

const Logo = memo(styled.a`
  display: flex;
  align-items: center;
  margin-right: 30px;

  &:after {
    content: '';
    width: 124px;
    height: 38px;
    background-image: url('../../img/logo.png');
    background-repeat: no-repeat;
  }
`);

const SearchInput = memo(styled.input`
  text-indent: 22px;
  padding: 13px 0px;
  box-sizing: border-box;
  width: 400px;
  height: 46px;
  border: 2px solid #21bf48;
  border-radius: 50px;

  &::placeholder {
    color: #767676;
    font-size: 14px;
    font-weight: 400;
  }
`);
