import styled from '@emotion/styled';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { joinValidState } from '../../Atom';

const ValueEqual = (prevProps, nextProps) => {
  console.log(prevProps.value, nextProps.value);
  return prevProps.value === nextProps.value;
};

const LongInput = ({ type, value, onChange, character, buttonTitle, onClick, max }) => {
  const joinValid = useRecoilValue(joinValidState);

  return (
    <LongInputWrapper>
      <InputWrapper>
        <Input type={type} value={value} onChange={onChange} character={character} maxLength={parseInt(max, 10)} />
        {character === 'id' ? <button onClick={onClick}>{buttonTitle}</button> : ''}
        {character === 'pw' || character === 'pwCheck' ? (
          <Check pwValid={joinValid[character]}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.85714L6.6 10L15 1" stroke="white" strokeWidth="2" />
            </svg>
          </Check>
        ) : (
          ''
        )}
      </InputWrapper>
    </LongInputWrapper>
  );
};

export default memo(LongInput, ValueEqual);

LongInput.defaultProps = {
  character: '',
  max: 20,
};

const LongInputWrapper = styled.div`
  margin-bottom: 16px;

  & > p {
    margin-bottom: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;

  & > button {
    width: 25%;
    background-color: #21bf48;
    color: white;
    border: none;
    border-radius: 5px;
    margin-left: 12px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: ${(props) => (props.character === 'id' ? '75%' : '100%')};
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
`;

const Check = styled.div`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.pwValid ? '#21BF48' : '#f2f2f2')};
  color: white;
`;
