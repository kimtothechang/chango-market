import styled from '@emotion/styled';

const LoginCategory = ({ logintype, onClick }) => {
  return (
    <CategoryWrapper whichUser={logintype}>
      <LoginWho onClick={() => onClick()}>구매회원 로그인</LoginWho>
      <LoginWho onClick={() => onClick()}>판매회원 로그인</LoginWho>
    </CategoryWrapper>
  );
};

export default LoginCategory;

const CategoryWrapper = styled.div`
  display: flex;

  & > button:first-of-type {
    background-color: ${(props) => (props.whichUser === 'BUYER' ? 'white' : '#f2f2f2')};
    border-bottom: ${(props) => (props.whichUser === 'BUYER' ? 'none' : '1px solid #c4c4c4')};
  }
  & > button:last-child {
    background-color: ${(props) => (props.whichUser === 'BUYER' ? '#f2f2f2' : 'white')};
    border-bottom: ${(props) => (props.whichUser === 'BUYER' ? '1px solid #c4c4c4' : 'none')};
  }
`;

const LoginWho = styled.button`
  width: 50%;
  height: 60px;
  border: 1px solid #c4c4c4;
  border-bottom: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  cursor: pointer;
`;
