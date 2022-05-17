import styled from '@emotion/styled';
import { ColorObject } from '../../constants';

const LongButton = ({ text, onClick, color }) => {
  return (
    <Button onClick={() => onClick()} color={color}>
      {text}
    </Button>
  );
};

LongButton.defaultProps = {
  text: '',
  color: ColorObject.basic,
};

export default LongButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
  padding-bottom: 19px;
  width: 416px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;
