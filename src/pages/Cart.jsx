import styled from '@emotion/styled';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

import Header from '../components/layouts/Header';
import IconButton from '../components/common/IconButton';
import CartList from '../components/cart/CartList';

import { fetcherAuth } from '../utils/fetcher';
import { BASIC_PAGE_WIDTH } from '../constants';
import { myPageToggle } from '../Atom';

const Cart = () => {
  const [toggle, setToggle] = useRecoilState(myPageToggle);
  const navigate = useNavigate();

  const switchToggle = useCallback(() => {
    setToggle((current) => !current);
  }, []);

  return (
    <main>
      <Header
        lefticon={<IconButton onClick={() => navigate('/cart')} text="장바구니" src={`${process.env.PUBLIC_URL}/assets/icon-shopping-cart.svg`} />}
        righticon={<IconButton onClick={switchToggle} text="마이페이지" src={`${process.env.PUBLIC_URL}/assets/icon-user.svg`} />}
      />
      <CartList />
    </main>
  );
};

export default Cart;
