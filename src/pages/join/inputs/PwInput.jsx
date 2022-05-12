import styled from '@emotion/styled';
import { memo } from 'react';

import { ColorObject } from '../../../constants';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.pwValid === nextProps.pwValid;
};

const PwInput = ({ type, value, onChange, character, pwValid, max }) => {
  return (
    <InputWrapper>
      <Input type={type} value={value} onChange={onChange} character={character} maxLength={parseInt(max, 10)} />
      <Check pwValid={pwValid}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4.85714L6.6 10L15 1" stroke="white" strokeWidth="2" />
        </svg>
      </Check>
    </InputWrapper>
  );
};

export default memo(PwInput, ValueEqual);

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 16px;

  & > button {
    width: 25%;
    background-color: #21bf48;
    color: white;
    border: none;
    border-radius: 5px;
    margin-left: 12px;
    cursor: pointer;
  }
`;

const InputEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

const Input = memo(
  styled.input`
    width: 100%;
    padding: 16px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  `,
  InputEqual
);

const CheckEqual = (prevProps, nextProps) => {
  return prevProps.pwValid === nextProps.pwValid;
};

const Check = memo(
  styled.div`
    position: absolute;
    top: 13px;
    right: 13px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.pwValid ? ColorObject.basic : '#f2f2f2')};
    color: white;
  `,
  CheckEqual
);
