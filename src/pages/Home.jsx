import MainTemplate from '../components/layouts/MainTemplate';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import HomeContainer from '../container/HomeContainer';

const Home = () => {
  return (
    <MainTemplate header={<Header />} footer={<Footer />}>
      <HomeContainer />
    </MainTemplate>
  );
};

export default Home;
