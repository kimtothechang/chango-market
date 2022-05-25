import styled from '@emotion/styled';

import ProductInfo from '../components/product/ProductInfo';
import Contents from '../components/product/Contents';

import { BASIC_PAGE_WIDTH } from '../constants';

const ProductContainer = () => {
  return (
    <Wrapper>
      <ProductInfo />
      <Contents />
    </Wrapper>
  );
};

export default ProductContainer;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 80px;
  max-width: ${BASIC_PAGE_WIDTH};
`;
