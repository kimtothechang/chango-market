import styled from '@emotion/styled';
import { memo } from 'react';

const Heading3 = ({ text }) => {
  return <HeadingWrapper>{text}</HeadingWrapper>;
};

export default memo(Heading3);

const HeadingWrapper = styled.h3`
  padding-top: 40px;
  padding-bottom: 8px;
  border-bottom: 2px solid #c4c4c4;
  font-size: 18px;
  font-weight: 500;
`;
