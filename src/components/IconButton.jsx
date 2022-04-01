import styled from '@emotion/styled';

const IconButton = ({ src, alt, text, onClick }) => {
  return (
    <Button onClick={onClick}>
      <img src={src} alt={alt} />
      <p>{text}</p>
    </Button>
  );
};

export default IconButton;

const Button = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  margin-left: 26px;

  & > img {
    display: block;
  }

  & > p {
    display: block;
    color: #767676;
    font-size: 12px;
    font-weight: 400;
  }
`;
