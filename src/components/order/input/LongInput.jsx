import styled from '@emotion/styled';
import { memo } from 'react';

const LongInput = ({ text, value, onChange, type }) => {
  return (
    <InputWrapper>
      <p>{text}</p>
      <input type="text" onChange={(e) => onChange(e, type)} value={value} />
    </InputWrapper>
  );
};

export default memo(LongInput);

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid #c4c4c4;

  & > p {
    width: 15%;
    font-size: 16px;
    font-weight: 400;
  }

  & > input {
    border: 1px solid #c4c4c4;
    width: 60%;
    padding: 8px;
  }

  & input:focus {
    outline: none;
  }
`;
