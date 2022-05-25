import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { ColorObject } from '../constants';

const NotFoundContainer = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundWrapper>
      <img src={`${process.env.PUBLIC_URL}/assets/404error.svg`} alt="404 에러" />
      <div>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br />웹 주소가 올바른지 확인해주세요.
        </p>
        <div>
          <LinkToMain to="/">메인으로</LinkToMain>
          <button onClick={() => goBack()}>이전페이지</button>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default NotFoundContainer;

const NotFoundWrapper = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;

  & > img {
    margin-right: 52.84px;
  }

  & > div {
    & > p {
      white-space: nowrap;
    }
    & > p:first-of-type {
      font-size: 36px;
      font-weight: 700;
    }
    & > p:nth-of-type(2) {
      margin-top: 20px;
      margin-bottom: 40px;
      color: #767676;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
    }

    & > div {
      display: flex;
      white-space: nowrap;

      & > button {
        padding: 19px 66.5px;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        color: #767676;
        font-size: 18px;
        font-weight: 700;
        background-color: white;
        cursor: pointer;
      }
    }
  }
`;

const LinkToMain = styled(Link)`
  padding: 19px 66.5px;
  margin-right: 14px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  background-color: ${ColorObject.basic};
  cursor: pointer;
  text-decoration: none;

  &:active,
  &:visited {
    color: white;
    text-decoration-line: none;
  }
`;
