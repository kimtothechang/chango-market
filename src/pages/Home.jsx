import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useRecoilState } from 'recoil';
import { myPageToggle } from '../Atom';

import ItemList from '../components/home/ItemList';
import IconButton from '../components/common/IconButton';
import Banner from '../components/home/banner/Banner';
import Header from '../components/layouts/Header';

const Home = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useRecoilState(myPageToggle);

  useEffect(() => {
    setToggle(false);
  }, []);

  const switchToggle = useCallback(() => {
    setToggle((current) => !current);
  }, []);

  return (
    <main>
      {localStorage.getItem('token') ? (
        <Header
          lefticon={<IconButton onClick={() => navigate('/cart')} text="장바구니" src={`${process.env.PUBLIC_URL}/assets/icon-shopping-cart.svg`} />}
          righticon={<IconButton onClick={switchToggle} text="마이페이지" src={`${process.env.PUBLIC_URL}/assets/icon-user.svg`} />}
        />
      ) : (
        <Header
          lefticon={<IconButton text="장바구니" src={`${process.env.PUBLIC_URL}/assets/icon-shopping-cart.svg`} />}
          righticon={<IconButton onClick={() => navigate('/login')} text="로그인" src={`${process.env.PUBLIC_URL}/assets/icon-user.svg`} />}
        />
      )}

      <Banner />
      <ItemList />
    </main>
  );
};

export default Home;

const HomeWrapper = styled.main`
  margin: 0px;
  padding: 0px;
`;
