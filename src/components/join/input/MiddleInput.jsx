import styled from '@emotion/styled';
import { memo } from 'react';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

const MiddleInput = ({ type, value, onChange }) => {
  return (
    <InputWrapper>
      <input type={type} value={value} onChange={onChange} />
    </InputWrapper>
  );
};

export default memo(MiddleInput, ValueEqual);

const InputWrapper = styled.div`
  & > input {
    padding-left: 16px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 16px;
    padding-bottom: 16px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }
`;
