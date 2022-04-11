import { useNavigate } from 'react-router';

import { useRecoilState } from 'recoil';
import { myPageToggle } from '../../Atom';

import ItemList from './ItemList';
import IconButton from '../../components/IconButton';
import Banner from './Banner';
import Header from '../../components/layouts/Header';
import { useCallback } from 'react';
import { useEffect } from 'react';

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
