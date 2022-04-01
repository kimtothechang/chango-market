import styled from '@emotion/styled';

const BannerButton = ({ onClick }) => {
  return <Button onClick={onClick} />;
};

export default BannerButton;

const Button = styled.button`
  margin-right: 6px;
  padding: 0px;
  width: 6px;
  height: 6px;
  border: none;
  border-radius: 3px;
  background-color: #fff;
`;
