import styled from '@emotion/styled';

const Heading2 = ({ text }) => {
  return <HeadingWrapper>{text}</HeadingWrapper>;
};

export default Heading2;

const HeadingWrapper = styled.h2`
  padding-bottom: 18px;
  border-bottom: 2px solid #c4c4c4;
  font-size: 24px;
  font-weight: 500;
`;
