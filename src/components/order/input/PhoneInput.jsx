import styled from '@emotion/styled';
import { memo } from 'react';

const isEqual = (prev, next) => {
  if (prev.value1 !== next.value1) {
    return false;
  } else if (prev.value2 !== next.value2) {
    return false;
  } else if (prev.value3 !== next.value3) {
    return false;
  }
  return true;
};

const PhoneInput = ({ text, value1, value2, value3, onChange }) => {
  return (
    <InputWrapper>
      <p>{text}</p>
      <div>
        <input type="text" onChange={(e) => onChange(e, 1)} value={value1} />
        <p>-</p>
        <input type="text" onChange={(e) => onChange(e, 2)} value={value2} />
        <p>-</p>
        <input type="text" onChange={(e) => onChange(e, 3)} value={value3} />
      </div>
    </InputWrapper>
  );
};

export default memo(PhoneInput, isEqual);

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

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30%;

    & > input {
      width: 30%;
      padding: 8px;
      border: 1px solid #c4c4c4;
    }

    & > p {
      color: #c4c4c4;
    }
  }

  & input:focus {
    outline: none;
  }
`;
