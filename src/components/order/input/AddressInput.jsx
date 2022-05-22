import styled from '@emotion/styled';
import { ColorObject } from '../../../constants';
import DaumPostcode from 'react-daum-postcode';

// 우편번호 조회 API 스타일링
const postCodeStyle = {
  display: 'block',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '600px',
  height: '400px',
  padding: '7px',
  border: '1px solid #c4c4c4',
};

const AddressInput = ({ text, onToggle, toggle, zipcode, address1, onCompletePost, onChange, address2 }) => {
  return (
    <InputContainer>
      <p>{text}</p>
      <InputWrapper>
        <div>
          <input type="text" onChange={(e) => ''} value={zipcode || ''} />
          <button onClick={() => onToggle()}>우편번호 조회</button>
        </div>
        <input type="text" onChange={(e) => ''} value={address1 || ''} />
        <input type="text" onChange={(e) => onChange(e)} value={address2 || ''} />
      </InputWrapper>
      {toggle ? (
        <PopupWrapper onClick={() => onToggle()}>
          <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
        </PopupWrapper>
      ) : null}
    </InputContainer>
  );
};

export default AddressInput;

const InputWrapper = styled.div`
  display: flex;
    flex-direction: column;
    width: 60%;

    & > div {
      display: flex;
      justify-content: space-between;
      width: 50%;

      & > input {
        width: 50%;
        padding: 8px;
        border: 1px solid #c4c4c4;
      }

      & > button {
        padding-top: 10px;
        padding-bottom: 10px;
        width: 45%;
        border: none;
        border-radius: 5px;
        color: white;
        background-color: ${ColorObject.basic};
        cursor:pointer;
      }
    }

    & > input {
      padding: 8px;
      border: 1px solid #c4c4c4;
    }

    & > input:first-of-type {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid #c4c4c4;

  & > p {
    width: 15%;
    font-size: 16px;
    font-weight: 400;
  }

  & input:focus {
    outline: none;
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
`;
