import styled from '@emotion/styled';

const Heading = ({ title }) => {
  return <Title>{title}</Title>;
};

export default Heading;

const Title = styled.h2`
  margin-top: 54px;
  margin-bottom: 52px;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
`;
