import styled from '@emotion/styled';
// import { useState } from 'react';
import ItemCard from './ItemCard';
import { BASIC_PAGE_WIDTH } from '../../constants';
import { useEffect } from 'react';

const dummyItemList = [
  {
    id: 0,
    img: `${process.env.PUBLIC_URL}/assets/product/pouch.jpg`,
    seller: '주인장 챙고',
    product: '파우치',
    price: '29000',
  },
  {
    id: 1,
    img: `${process.env.PUBLIC_URL}/assets/product/sticker.jpg`,
    seller: '자유로운 영혼 김감',
    product: '스티커',
    price: '5000',
  },
  {
    id: 2,
    img: `${process.env.PUBLIC_URL}/assets/product/keyring-licat.jpg`,
    seller: '드리프트마스터 코노',
    product: '키링(라이캣)',
    price: '9000',
  },
  {
    id: 3,
    img: `${process.env.PUBLIC_URL}/assets/product/keyring-gary.jpg`,
    seller: '드리프트마스터 코노',
    product: '키링(개리)',
    price: '9000',
  },
  {
    id: 4,
    img: `${process.env.PUBLIC_URL}/assets/product/blanket.jpg`,
    seller: '프리허거 김예수',
    product: '담요',
    price: '14000',
  },
];

const ItemList = () => {
  // const [data, setData] = useState();

  const getData = async () => {
    // const url = 'http://13.209.150.154:8888/products/';
    // const res = await fetch(url).then((res) => res.json());
    // console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ItemListWrapper>
      {dummyItemList.map((item) => (
        <ItemCard key={item.id} img={item.img} alt={item.product} seller={item.seller} product={item.product} price={item.price} />
      ))}
    </ItemListWrapper>
  );
};

export default ItemList;

const ItemListWrapper = styled.article`
  margin: 0px auto;
  width: ${BASIC_PAGE_WIDTH};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 78px;
  column-gap: 70px;
  margin-top: 80px;
  margin-bottom: 180px;
`;
