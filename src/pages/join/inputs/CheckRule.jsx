import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { joinSellerValidState, joinValidState } from '../../../Atom';

const CheckRule = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedBuyer, setIsCheckedBuyer] = useRecoilState(joinValidState);
  const [isCheckedSeller, setIsCheckedSeller] = useRecoilState(joinSellerValidState);

  const toggleCheck = () => {
    setIsChecked((current) => !current);
    setIsCheckedBuyer((current) => {
      return { ...current, check: !current.check };
    });

    setIsCheckedSeller((current) => {
      return { ...current, check: !current.check };
    });
  };

  return (
    <CheckWrapper>
      <input type="checkbox" checked={isChecked} onChange={toggleCheck} />
      <p>
        호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한 내용을 확인하였고 동의합니다.
      </p>
    </CheckWrapper>
  );
};

export default CheckRule;

const CheckWrapper = styled.div`
  display: flex;
  margin: 0px auto;
  margin-top: 34px;
  width: 480px;
  font-size: 16px;
  color: #767676;

  & > input {
    margin-right: 10px;
    width: 16px;
    height: 16px;
  }

  & > p > span {
    font-weight: 700;
    border-bottom: 1px solid #767676;
    cursor: pointer;
  }
`;
