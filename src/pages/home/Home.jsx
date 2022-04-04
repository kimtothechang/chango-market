import { useNavigate } from 'react-router';

import ItemList from './ItemList';
import IconButton from '../../components/IconButton';
import Banner from './Banner';
import Header from '../../components/layouts/Header';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Header
        lefticon={<IconButton text="장바구니" src={`${process.env.PUBLIC_URL}/assets/icon-shopping-cart.svg`} />}
        righticon={<IconButton onClick={() => navigate('/login')} text="로그인" src={`${process.env.PUBLIC_URL}/assets/icon-user.svg`} />}
      />
      <Banner />
      <ItemList />
    </main>
  );
};

export default Home;
