import styled from '@emotion/styled';
import { memo } from 'react';

import { ColorObject } from '../../../constants';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.valid === nextProps.valid;
};

const ButtonInput = ({ type, value, onChange, onClick, buttonTitle, max, valid }) => {
  return (
    <InputWrapper>
      <Input type={type} value={value} onChange={onChange} maxLength={parseInt(max, 10)} />
      <button onClick={onClick}>{buttonTitle}</button>
    </InputWrapper>
  );
};

export default memo(ButtonInput, ValueEqual);

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 16px;

  & > button {
    width: 25%;
    background-color: ${ColorObject.basic};
    color: white;
    border: none;
    border-radius: 5px;
    margin-left: 12px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 75%;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;
