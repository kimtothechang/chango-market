import styled from '@emotion/styled';
import { memo } from 'react';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

const LongInput = ({ type, value, onChange, max }) => {
  return (
    <InputWrapper>
      <Input type={type} value={value} onChange={onChange} maxLength={parseInt(max, 10)} />
    </InputWrapper>
  );
};

export default memo(LongInput, ValueEqual);

LongInput.defaultProps = {
  character: '',
  max: 20,
};

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;
