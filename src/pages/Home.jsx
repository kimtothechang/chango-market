import ItemList from '../components/home/ItemList';
import Banner from '../components/home/banner/Banner';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

const Home = () => {
  return (
    <main>
      <Header />
      <Banner />
      <ItemList />
      <Footer />
    </main>
  );
};

export default Home;
