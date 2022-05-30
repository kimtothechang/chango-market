import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { orderUserInfo } from '../../store';

import Heading3 from './common/Heading3';
import MiddleInput from './input/MiddleInput';
import PhoneInput from './input/PhoneInput';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(orderUserInfo);

  const handleChange = useCallback((e, type) => {
    setUserInfo((current) => ({ ...current, [type]: e.target.value }));
  }, []);

  const handlePhone = useCallback((e, order) => {
    setUserInfo((current) => {
      return { ...current, [`phone${order}`]: e.target.value };
    });
    setUserInfo((current) => {
      return { ...current, phone: current.phone1 + current.phone2 + current.phone3 };
    });
  }, []);

  return (
    <div>
      <Heading3 text="주문자 정보" />
      <MiddleInput text="이름" onChange={handleChange} value={userInfo.name} type="name" />
      <PhoneInput text="휴대폰" onChange={handlePhone} value1={userInfo.phone1} value={userInfo.phone2} value3={userInfo.phone3} />
      <MiddleInput text="이메일" onChange={handleChange} value={userInfo.email} type="email" />
    </div>
  );
};

export default UserInfo;
