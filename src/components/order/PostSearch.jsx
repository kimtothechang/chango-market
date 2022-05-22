import { useEffect } from 'react';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from '@emotion/styled';

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

const PostSearch = () => {
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((current) => !current);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    togglePopup();
  };

  useEffect(() => {
    console.log(address);
    console.log(addressDetail);
  }, [address, addressDetail]);

  return (
    <div>
      <button onClick={() => togglePopup()}>우편번호 조회</button>
      {isPopupOpen ? (
        <PopupWrapper onClick={() => togglePopup()}>
          <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
        </PopupWrapper>
      ) : null}
    </div>
  );
};

export default PostSearch;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  width: ${window.outerWidth}px;
  height: 100%;
`;
