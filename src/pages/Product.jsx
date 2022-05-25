import MainTemplate from '../components/layouts/MainTemplate';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import ProductContainer from '../container/ProductContainer';

const Product = () => {
  return (
    <MainTemplate header={<Header />} footer={<Footer />}>
      <ProductContainer />
    </MainTemplate>
  );
};

export default Product;
