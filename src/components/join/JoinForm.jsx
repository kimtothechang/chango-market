import styled from '@emotion/styled';
import { memo } from 'react';

import LongInput from './input/LongInput';
import ShortInput from './input/ShortInput';
import MiddleInput from './input/MiddleInput';

import { useRecoilState, useRecoilValue } from 'recoil';
import { joinState, joinValidState, joinTypeState } from '../../store';
import { useState, useEffect } from 'react';

import { BASIC_SERVER_URL, regxObj } from '../../constants';
import InputTitle from './InputTitle';
import ButtonInput from './input/ButtonInput';
import PwInput from './input/PwInput';
import Warning from './Warning';

// 리렌더링 방지
const NumberEqual = (prevProps, nextProps) => {
  for (let i = 0; i < prevProps.children.length; i++) {
    if (prevProps.children[i].props.value !== nextProps.children[i].props.value) {
      return false;
    }
  }
  return true;
};
// 리렌더링 방지
const EmailEqual = (prevProps, nextProps) => {
  for (let i = 0; i < prevProps.children.length; i++) {
    if (prevProps.children[i].props.value !== nextProps.children[i].props.value) {
      return false;
    }
  }
  return true;
};

const ERROR_MESSAGE = {
  id: {
    valid: '4~20자 이내 영문, 숫자로 만들어야합니다.',
    check: '중복 확인을 해주세요.',
    same: '해당 사용자 아이디는 이미 존재합니다.',
    ok: '사용 가능한 아이디입니다.',
  },
  company: {
    valid: '10자의 숫자로 입력해주세요.',
    check: '인증을 해주세요.',
    same: '해당 사업자등록번호는 이미 존재합니다.',
    ok: '사용 가능한 번호입니다.',
  },
};

const JoinForm = () => {
  const joinType = useRecoilValue(joinTypeState);
  const [joinInfo, setJoinInfo] = useRecoilState(joinState);
  const [joinValid, setJoinValid] = useRecoilState(joinValidState);
  const [error, setError] = useState('');
  const [errorCompany, setErrorCompany] = useState('');
  const [samePw, setSamePw] = useState('');

  // 실시간 유효성 검사
  const liveValidCheck = (type) => {
    if (regxObj[type].test(joinInfo[type])) {
      setJoinValid((current) => {
        if (type === 'pwCheck') {
          const bool = !!(joinInfo.pw === joinInfo.pwCheck);
          return { ...current, [type]: bool };
        } else {
          return { ...current, [type]: true };
        }
      });
    } else {
      setJoinValid((current) => {
        return { ...current, [type]: false };
      });
    }
  };

  // 실시간 ID 유효성 검사 및 중복 확인 후 입력 바뀔 경우 초기화
  useEffect(() => {
    liveValidCheck('id');
    // 사용 가능한 아이디거나 중복인 경우에 id값이 변경될 경우 오류 메세지 수정 및 idCheck값 false
    if (error === ERROR_MESSAGE.id.ok || error === ERROR_MESSAGE.id.same) {
      setError((current) => (current = ERROR_MESSAGE.id.check));
    }
    setJoinValid((current) => {
      return { ...current, idCheck: false };
    });
  }, [joinInfo.id]);

  useEffect(() => {
    setError((current) => {
      if (joinValid.id) {
        return ERROR_MESSAGE.id.check;
      } else {
        return ERROR_MESSAGE.id.valid;
      }
    });
  }, [joinValid.id]);

  useEffect(() => {
    liveValidCheck('pw');
    liveValidCheck('pwCheck');
  }, [joinInfo.pw, joinInfo.pwCheck]);

  // onChange
  const onChangeJoin = (e, what) => {
    setJoinInfo((current) => {
      return { ...current, [what]: e.target.value };
    });
  };

  useEffect(() => {
    liveValidCheck('name');
  }, [joinInfo.name]);

  useEffect(() => console.log(joinValid), [joinValid]);

  // phone 각 인풋을 이용한 실시간 업데이트
  useEffect(() => {
    setJoinInfo((current) => {
      return { ...current, phone: current.phone1 + current.phone2 + current.phone3 };
    });
  }, [joinInfo.phone1, joinInfo.phone2, joinInfo.phone3]);

  // phone 유효성 검사
  useEffect(() => {
    liveValidCheck('phone');
  }, [joinInfo.phone]);

  // email 각 인풋을 이용한 실시간 업데이트
  useEffect(() => {
    setJoinInfo((current) => {
      return { ...current, email: current.email1 + '@' + current.email2 };
    });
  }, [joinInfo.email1, joinInfo.email2]);

  useEffect(() => {
    liveValidCheck('email');
  }, [joinInfo.email]);

  // 사업자 등록번호
  useEffect(() => {
    liveValidCheck('company');
    if (errorCompany === ERROR_MESSAGE.company.ok || errorCompany === ERROR_MESSAGE.company.same) {
      setErrorCompany((current) => (current = ERROR_MESSAGE.company.check));
    }
    setJoinValid((current) => {
      return { ...current, companyCheck: false };
    });
  }, [joinInfo.company]);

  useEffect(() => {
    setErrorCompany((current) => {
      if (joinValid.company) {
        return ERROR_MESSAGE.company.check;
      } else {
        return ERROR_MESSAGE.company.valid;
      }
    });
  }, [joinValid.company]);

  // 스토어 이름 실시간 유효성 검사
  useEffect(() => {
    liveValidCheck('store');
  }, [joinInfo.store]);

  // 중복 확인 클릭 시 ID중복 여부 판단
  const checkValue = async (type) => {
    if (!joinValid[type]) {
      if (type === 'id') {
        setError((current) => (current = ERROR_MESSAGE.id.valid));
      } else if (type === 'company') {
        setErrorCompany((current) => (current = ERROR_MESSAGE.company.valid));
      }
      return;
    }

    const API_TYPE = {
      id: 'signup/',
      company: 'signup_seller/',
    };
    const sendingData = {
      username: joinInfo[type],
      password: '1q2w3e4r',
      password2: '1q2w3e4r',
      phone_number: '01029101757',
      name: 'chango',
    };

    if (type === 'company') {
      sendingData.company_registration_number = joinInfo[type].split('-').join('');
      sendingData.store_name = '1';
      sendingData.username = '1';
    }

    const res = await fetch(`${BASIC_SERVER_URL}/accounts/${API_TYPE[type]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...sendingData,
      }),
    });

    const data = await res.json();

    // ID 중복 검사일 경우
    if (type === 'id') {
      setError((current) => {
        if (!!data.username) {
          return ERROR_MESSAGE.id.same;
        } else {
          return ERROR_MESSAGE.id.ok;
        }
      });

      setJoinValid((current) => {
        if (!!data.username) {
          return { ...current, idCheck: false };
        } else {
          return { ...current, idCheck: true };
        }
      });
    }

    // 사업자 등록번호 인증일 경우
    if (type === 'company') {
      setErrorCompany((current) => {
        if (!!data.company_registration_number) {
          return ERROR_MESSAGE.company.same;
        } else {
          return ERROR_MESSAGE.company.ok;
        }
      });

      setJoinValid((current) => {
        if (!!data.company_registration_number) {
          return { ...current, companyCheck: false };
        } else {
          return { ...current, companyCheck: true };
        }
      });
    }
  };

  return (
    <Section>
      <InputTitle title="아이디" />
      <ButtonInput
        type="text"
        value={joinInfo.id}
        onChange={(e) => onChangeJoin(e, 'id')}
        onClick={() => checkValue('id')}
        buttonTitle="중복 확인"
        max="20"
        valid={joinValid.id}
      />
      <Warning content={error} />

      <InputTitle title="비밀번호" />
      <PwInput type="password" value={joinInfo.pw} onChange={(e) => onChangeJoin(e, 'pw')} max="20" pwValid={joinValid.pw} />

      <InputTitle title="비밀번호 재확인" />
      <PwInput type="password" value={joinInfo.pwCheck} onChange={(e) => onChangeJoin(e, 'pwCheck')} max="20" pwValid={joinValid.pwCheck} />
      <Warning content={samePw} />

      <InputTitle title="이름" />
      <LongInput type="text" value={joinInfo.name} onChange={(e) => onChangeJoin(e, 'name')} />

      <InputTitle title="휴대폰 번호" />
      <NumberWrapper>
        <ShortInput type="text" value={joinInfo.phone1} onChange={(e) => onChangeJoin(e, 'phone1')} max={3} />
        <ShortInput type="text" value={joinInfo.phone2} onChange={(e) => onChangeJoin(e, 'phone2')} max={4} />
        <ShortInput type="text" value={joinInfo.phone3} onChange={(e) => onChangeJoin(e, 'phone3')} max={4} />
      </NumberWrapper>

      <InputTitle title="이메일" />
      <EmailWrapper>
        <MiddleInput type="text" value={joinInfo.email1} onChange={(e) => onChangeJoin(e, 'email1')} />
        <p>@</p>
        <MiddleInput type="text" value={joinInfo.email2} onChange={(e) => onChangeJoin(e, 'email2')} />
      </EmailWrapper>

      {joinType === 'SELLER' ? (
        <div>
          <InputTitle title="사업자 등록번호" />
          <ButtonInput
            type="text"
            value={joinInfo.company}
            onChange={(e) => onChangeJoin(e, 'company')}
            onClick={() => checkValue('company')}
            buttonTitle="인증"
            max="10"
            valid={joinValid.company}
          />
          <Warning content={errorCompany} />
          <InputTitle title="스토어 이름" />
          <LongInput type="text" value={joinInfo.store} onChange={(e) => onChangeJoin(e, 'store')} max={10} />
        </div>
      ) : (
        ''
      )}
    </Section>
  );
};

export default JoinForm;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 35px;
  border: 1px solid #c4c4c4;
  border-top: none;
  border-radius: 10px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const NumberWrapper = memo(
  styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
  NumberEqual
);

const EmailWrapper = memo(
  styled.div`
    display: flex;
    align-items: center;

    & > p {
      margin-left: 11px;
      margin-right: 11px;
    }

    & > div {
      flex-grow: 1;
    }
  `,
  EmailEqual
);
