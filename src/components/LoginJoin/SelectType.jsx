import styled from '@emotion/styled';

import { useRecoilState } from 'recoil';
import { joinTypeState } from '../../Atom';

const SelectType = ({ leftText, rightText }) => {
  const [joinType, setJoinType] = useRecoilState(joinTypeState);

  const handleJoinType = () => {
    if (joinType === 'BUYER') {
      setJoinType('SELLER');
    } else {
      setJoinType('BUYER');
    }
  };

  return (
    <CategoryWrapper whichUser={joinType}>
      <LoginWho onClick={handleJoinType}>{leftText}</LoginWho>
      <LoginWho onClick={handleJoinType}>{rightText}</LoginWho>
    </CategoryWrapper>
  );
};

export default SelectType;

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
