import styled from '@emotion/styled';
import { memo } from 'react';

const LoginInput = ({ type, value, onChange, placeholder }) => {
  return (
    <InputWrapper>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </InputWrapper>
  );
};

export default memo(LoginInput);

const InputWrapper = styled.div`
  & > input {
    box-sizing: border-box;
    width: 100%;
    padding: 22px;
    border: none;
    border-bottom: 1px solid #c4c4c4;

    &:focus {
      outline: none;
    }
  }
`;
