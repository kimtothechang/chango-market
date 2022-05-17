import styled from '@emotion/styled';
import { useState, useEffect, memo } from 'react';

import { BASIC_PAGE_WIDTH, BASIC_SERVER_URL } from '../../constants';
import ItemCard from './ItemCard';
import { fetcher } from '../../utils/fetcher';

const ItemList = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const products = await fetcher('/products/', 'GET');

    setData([...products.results]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ItemListWrapper>
      <FlexBox>
        {data.map((item) => (
          <ItemCard
            key={item.product_id}
            id={item.product_id}
            img={item.image}
            seller={item.seller_store}
            product={item.product_name}
            price={item.price}
            alt={item.product_name}
          />
        ))}
      </FlexBox>
    </ItemListWrapper>
  );
};

export default memo(ItemList);

const ItemListWrapper = styled.article`
  margin: 0px auto;
  margin-top: 80px;
  margin-bottom: 180px;
  max-width: ${BASIC_PAGE_WIDTH};
  padding: 16px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
`;
