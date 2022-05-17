import styled from '@emotion/styled';
import { ColorObject } from '../../constants';

const MiddleButton = ({ text, onClick, color }) => {
  return (
    <Button onClick={() => onClick()} color={color}>
      {text}
    </Button>
  );
};

MiddleButton.defaultProps = {
  text: '',
  color: ColorObject.basic,
};

export default MiddleButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
  padding-bottom: 19px;
  width: 200px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;
