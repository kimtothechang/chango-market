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
  @media screen and (max-width: 500px) {
    margin-right: 8px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 26px;
  border: none;
  background-color: inherit;
  width: 50%;
  max-width: 60px;

  & > img {
    display: block;
    width: 50%;
    max-width: 50%;
  }

  & > p {
    display: block;
    color: #767676;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }
`;
