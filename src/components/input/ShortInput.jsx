import styled from '@emotion/styled';
import { memo } from 'react';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

const ShortInput = ({ refprops, type, value, onChange, character, max }) => {
  return (
    <InputWrapper>
      <input ref={refprops} type={type} value={value} onChange={onChange} maxLength={max} />
    </InputWrapper>
  );
};

ShortInput.defaultProps = {
  character: '',
};

export default memo(ShortInput, ValueEqual);

const InputWrapper = styled.div`
  margin-bottom: 16px;
  width: 32%;

  & > input {
    width: 100%;
    padding-left: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }
`;
