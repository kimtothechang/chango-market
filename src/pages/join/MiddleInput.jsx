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
  margin-bottom: 16px;
`;
