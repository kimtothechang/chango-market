import styled from '@emotion/styled';
import { memo } from 'react';

const Warning = ({ content }) => {
  return <P>{content}</P>;
};

export default memo(Warning);

const P = styled.p`
  color: green;
  margin-bottom: 16px;
`;
