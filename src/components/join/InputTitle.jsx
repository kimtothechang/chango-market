import styled from '@emotion/styled';
import { memo } from 'react';

const InputTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

export default memo(InputTitle);

const Title = styled.p`
  display: flex;
  margin-top: 12px;
  margin-bottom: 10px;
`;
