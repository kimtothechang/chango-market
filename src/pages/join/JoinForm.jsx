import styled from '@emotion/styled';
import { memo, useCallback, useRef } from 'react';

import LongInput from './LongInput';
import ShortInput from './ShortInput';
import MiddleInput from './MiddleInput';

import { useRecoilState, useRecoilValue } from 'recoil';
import { joinState, joinValidState } from '../../Atom';
import { useState, useEffect } from 'react';

import { BASIC_SERVER_URL, regxObj } from '../../constants';

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
  valid: '4~20자 이내 영문, 숫자로 만들어야합니다.',
  check: '중복 확인을 해주세요.',
  same: '해당 사용자 아이디는 이미 존재합니다.',
  ok: '사용 가능한 아이디입니다.',
};

const JoinForm = () => {
  const [joinInfo, setJoinInfo] = useRecoilState(joinState);
  const [joinValid, setJoinValid] = useRecoilState(joinValidState);
  const [error, setError] = useState('');
  const [samePw, setSamePw] = useState('');

  // 동기적 setJoinValid 처리
  const passValid = (type, bool) => {
    console.log(type, bool);
    setJoinValid((current) => {
      return { ...current, [type]: !!bool };
    });
  };

  // ID 유효성 검사
  const onBlur = () => {
    if (!regxObj.id.test(joinInfo.id)) {
      passValid('id', false);
      setError((current) => (current = ERROR_MESSAGE.valid));
    } else if (regxObj.id.test(joinInfo.id)) {
      passValid('id', true);
      setError((current) => (current = ERROR_MESSAGE.check));
    } else if (!joinInfo.idCheck) {
      passValid('id', true);
      setError((current) => (current = ERROR_MESSAGE.check));
    }
  };

  // PW, PWCHECK 유효성 검사
  const liveValidCheck = (type) => {
    if (regxObj[type].test(joinInfo[type])) {
      setJoinValid((current) => {
        if (type === 'pwCheck') {
          const bool = sameCheck();
          return { ...current, [type]: bool };
        } else {
          passValid('pw', true);
          return { ...current, [type]: true };
        }
      });
    } else {
      setJoinValid((current) => {
        return { ...current, [type]: false };
      });
    }
  };

  // PW, PWCHECK 같은지 검사
  const sameCheck = () => {
    if (joinInfo.pw === joinInfo.pwCheck) {
      setSamePw((current) => '');
      passValid('pwCheck', true);
      return true;
    } else {
      setSamePw((current) => '비밀번호가 일치하지 않습니다.');
      return false;
    }
  };

  // phone 각 인풋을 이용한 실시간 업데이트
  useEffect(() => {
    setJoinInfo((current) => {
      return { ...current, phone: current.phone1 + current.phone2 + current.phone3 };
    });
  }, [joinInfo.phone1, joinInfo.phone2, joinInfo.phone3]);

  // email 각 인풋을 이용한 실시간 업데이트
  useEffect(() => {
    setJoinInfo((current) => {
      return { ...current, email: current.email1 + '@' + current.email2 };
    });
  }, [joinInfo.email1, joinInfo.email2]);

  // id 입력 값이 변경될 경우 중복 확인을 시키기 위함
  useEffect(() => {
    setJoinValid((current) => {
      return { ...current, idCheck: false };
    });
  }, [joinInfo.id]);

  useEffect(() => {
    liveValidCheck('pw');
    liveValidCheck('pwCheck');
    liveValidCheck('phone');
    liveValidCheck('name');
    liveValidCheck('email');
  }, [joinInfo.pw, joinInfo.pwCheck, joinInfo.phone, joinInfo.name, joinInfo.email]);

  // onChange
  const onChangeJoin = useCallback(
    (e, what) => {
      setJoinInfo((current) => {
        return { ...current, [what]: e.target.value };
      });
    },
    [joinInfo]
  );

  // 중복 확인 클릭 시 ID중복 여부 판단
  const checkIDCheck = useCallback(async () => {
    console.log(joinValid);
    if (!joinValid.id) {
      console.log('유효성 실패쓰');
      setError((current) => (current = ERROR_MESSAGE.valid));
      return;
    }
    const url = BASIC_SERVER_URL;
    const res = await fetch(`${url}/accounts/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: joinInfo.id,
        password: '1',
        password2: '1',
        phone_number: '1',
        name: '1',
      }),
    });
    const data = await res.json();
    setJoinValid((current) => {
      return { ...current, idCheck: true };
    });

    if (data.username) {
      setError((current) => (current = ERROR_MESSAGE.same));
      setJoinValid((current) => {
        return { ...current, idCheck: false };
      });
    } else {
      setError((current) => (current = ERROR_MESSAGE.ok));

      setJoinValid((current) => {
        return { ...current, id: true, idCheck: true };
      });
      console.log('id is pass');
    }
  }, [joinInfo.id, joinValid.id, joinValid.idCheck]);

  return (
    <Section>
      <LongInput onBlur={onBlur} title="아이디" type="text" value={joinInfo.id} onChange={(e) => onChangeJoin(e, 'id')} character="id" onClick={checkIDCheck} />
      <p>{error}</p>
      <LongInput title="비밀번호" type="password" value={joinInfo.pw} onChange={(e) => onChangeJoin(e, 'pw')} character="pw" />
      <LongInput title="비밀번호 재확인" type="password" value={joinInfo.pwCheck} onChange={(e) => onChangeJoin(e, 'pwCheck')} character="pwCheck" />
      <p>{samePw}</p>
      <LongInput title="이름" type="text" value={joinInfo.name} onChange={(e) => onChangeJoin(e, 'name')} />

      <p>휴대폰 번호</p>
      <NumberWrapper>
        <ShortInput type="text" value={joinInfo.phone1} onChange={(e) => onChangeJoin(e, 'phone1')} max={3} />
        <ShortInput type="text" value={joinInfo.phone2} onChange={(e) => onChangeJoin(e, 'phone2')} max={4} />
        <ShortInput type="text" value={joinInfo.phone3} onChange={(e) => onChangeJoin(e, 'phone3')} max={4} />
      </NumberWrapper>

      <p>이메일</p>
      <EmailWrapper>
        <MiddleInput type="text" value={joinInfo.email1} onChange={(e) => onChangeJoin(e, 'email1')} />
        <p>@</p>
        <MiddleInput type="text" value={joinInfo.email2} onChange={(e) => onChangeJoin(e, 'email2')} />
      </EmailWrapper>
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

    & > div > input {
      padding-top: 16px;
      padding-bottom: 16px;
      border: 1px solid #c4c4c4;
      border-radius: 5px;
    }
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

    & > div > input {
      width: 100%;
      box-sizing: border-box;
      padding-top: 16px;
      padding-bottom: 16px;
      border: 1px solid #c4c4c4;
      border-radius: 5px;
    }
  `,
  EmailEqual
);

// font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
