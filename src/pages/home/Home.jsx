import ItemList from './ItemList';

//Component
import Banner from './Banner';
import Header from '../../components/layouts/Header';

const Home = () => {
  return (
    <main>
      <Header />
      <Banner />
      <ItemList />
    </main>
  );
};

export default Home;
