import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { totalPayment } from '../../Atom';

import CartItem from './CartItem';
import PriceInfo from './PriceInfo';

import { BASIC_PAGE_WIDTH, ColorObject } from '../../constants';
import { fetcher, fetcherAuth, fetcherBody } from '../../utils/fetcher';
import { Link } from 'react-router-dom';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [quantityState, setQuantityState] = useState([]);
  const [checkArr, setCheckArr] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [Payment, setPayment] = useRecoilState(totalPayment);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setShippingPrice((current) => {
      if (productItems.length > 0) {
        if (productItems.length > 1) {
          const temp = productItems.reduce((a, b) => a.shipping_fee + b.shipping_fee);
          return (current = temp);
        } else {
          const temp = productItems[0].shipping_fee;
          return (current = temp);
        }
      } else {
        return 0;
      }
    });
  }, [productItems]);

  useEffect(() => {
    const presetData = async () => {
      const res = await getItems();

      setCheckArr((current) => {
        const temp = [];
        for (let i = 0; i < res.results.length; i++) {
          temp.push(res.results[i].is_active);
        }
        return temp;
      });
      setQuantityState((current) => {
        const temp = [];
        for (let i = 0; i < res.results.length; i++) {
          temp.push(res.results[i].quantity);
        }
        return temp;
      });
    };

    presetData();
  }, []);

  const getItems = async () => {
    const res = await fetcherAuth('cart/', 'GET');
    setCartItems((current) => (current = [...res.results]));

    return res;
  };

  const getProduct = async (data) => {
    if (!!data[0]) {
      const arr = [];
      for (let product of data) {
        const res = await fetcher(`products/${product.product_id}`, 'GET');
        arr.push({ ...res });
      }
      setProductItems([...arr]);
    }
  };

  const getTotalPrice = (data, multiple, shipment) => {
    const res = data.map((item, idx) => item.price * multiple[idx].quantity);

    if (res.length > 0) {
      if (res.length > 1) {
        setPayment((current) => (current = res.reduce((a, b) => a + b) + shipment));
      } else {
        setPayment((current) => (current = res[0] + shipment));
      }
    } else {
      setPayment(0);
    }
  };

  const deleteItem = async (cartId, idx) => {
    await fetcherAuth(`cart/${cartId}/`, 'DELETE');

    setCartItems((current) =>
      current.filter((item) => {
        return cartId !== item.cart_item_id;
      })
    );
    setCheckArr((current) => {
      const temp = [];
      for (let i = 0; i < current.length; i++) {
        if (i !== idx) {
          temp.push(current[i]);
        }
      }
      return temp;
    });

    setQuantityState((current) => {
      const temp = [];
      for (let i = 0; i < current.length; i++) {
        if (i !== idx) {
          temp.push(current[i]);
        }
      }
      return temp;
    });
  };

  const handleCheck = async (value) => {
    setCheckArr((current) => {
      const temp = current.map((val, idx) => {
        if (value === idx) {
          return !val;
        } else {
          return val;
        }
      });
      return temp;
    });
  };

  const handleAllCheck = () => {
    setAllCheck((current) => !current);
  };

  useEffect(() => {
    if (allCheck === true) {
      setCheckArr((current) => {
        const temp = current.map((val) => (val ? val : true));
        return temp;
      });
    } else {
      setCheckArr((current) => {
        const temp = current.map((val) => (val ? false : val));
        return temp;
      });
    }
  }, [allCheck]);

  const handleQuantity = (value, idx) => {
    setQuantityState((current) => {
      const temp = [];
      current.forEach((val, i) => {
        if (i === idx) {
          temp.push(current[i] + value);
        } else {
          temp.push(current[i]);
        }
      });
      return temp;
    });
  };

  useEffect(() => {
    getProduct(cartItems);
  }, [cartItems]);

  useEffect(() => {
    getTotalPrice(productItems, cartItems, shippingPrice);
  }, [productItems, shippingPrice]);

  useEffect(() => {
    const updateIsActive = async (value, cartId, productId, productQuantity, index) => {
      if (cartItems[index].is_active !== value) {
        const res = await fetcherBody(`cart/${cartId}/`, 'PUT', {
          product_id: productId,
          quantity: productQuantity,
          is_active: value,
        });

        await updateData();
      }
    };

    cartItems.forEach(async (value, idx) => {
      await updateIsActive(checkArr[idx], value.cart_item_id, value.product_id, value.quantity, idx);
    });

    const updateData = async () => {
      const res = await getItems();
    };
  }, [checkArr]);

  // 최종 주문 정보
  useEffect(() => {
    const updateOrderItems = () => {
      const temp = [];
      productItems.forEach((val, idx) => {
        if (checkArr[idx]) {
          temp.push({ ...val, amount: quantityState[idx] });
        }
      });
      setOrderItems(temp);
    };

    updateOrderItems();
  }, [checkArr, quantityState]);

  return (
    <CartListWrapper>
      <h2>장바구니</h2>
      <CartListHeader>
        <div>
          <input type="checkbox" onChange={handleAllCheck} checked={allCheck} />
          <p>상품정보</p>
        </div>
        <div>
          <p>수량</p>
          <p>상품금액</p>
        </div>
      </CartListHeader>
      <CartMain>
        {productItems.map((item, idx) => {
          return (
            <CartItem
              key={item.product_id}
              img={item.image}
              seller={item.seller_store}
              product={item.product_name}
              price={item.price}
              stock={item.stock}
              quantity={cartItems[idx] ? cartItems[idx].quantity : '0'}
              cartId={cartItems[idx] ? cartItems[idx].cart_item_id : 0}
              productId={cartItems[idx] ? cartItems[idx].product_id : 0}
              isActive={cartItems[idx] ? cartItems[idx].is_active : false}
              deleteItem={deleteItem}
              checkedProp={allCheck}
              eachCheck={checkArr[idx]}
              handleCheck={handleCheck}
              quantityProp={quantityState[idx]}
              quantitySet={handleQuantity}
              idx={idx}
              shippingFee={item.shipping_fee}
            />
          );
        })}
      </CartMain>
      <TotalPrice>
        <PriceInfo title="총 상품금액" price={Payment} />
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/icon-minus-line.svg`} alt="" />
        </div>
        <PriceInfo title="상품 할인" price={0} />
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/icon-plus-line.svg`} alt="" />
        </div>
        <PriceInfo title="배송비" price={shippingPrice} />
        <div>
          <p>결제 예정 금액</p>
          <p>
            {Payment.toLocaleString()}
            <span>원</span>
          </p>
        </div>
      </TotalPrice>
      <OrderLink to="/order" state={orderItems}>
        <OrderButton>주문하기</OrderButton>
      </OrderLink>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};

  & > h2 {
    margin-top: 54px;
    margin-bottom: 52px;
    font-size: 36px;
    font-weight: 700;
  }

  & > button {
    margin-bottom: 160px;
  }
`;

const CartListHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 19px;
  padding-bottom: 18px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
  background-color: #f2f2f2;

  & > div:first-of-type {
    display: flex;
    width: 59%;
    min-width: 377px;
    flex-grow: 1;

    & > input {
      max-width: 0%;
      flex-grow: 1;
    }
    & > p {
      text-align: center;
      max-width: 100%;
      flex-grow: 1;
    }
  }
  & > div:last-of-type {
    display: flex;
    justify-content: space-between;
    width: 41%;
    min-width: 377px;
    flex-grow: 1;

    & > p:first-of-type {
      text-align: center;
      width: 35%;
    }
    & > p:last-of-type {
      text-align: center;
      width: 60%;
    }
  }
`;

const CartMain = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 70px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  padding-top: 46px;
  padding-bottom: 42px;
  width: 100%;
  border-radius: 10px;
  background-color: #f2f2f2;

  & > div:nth-of-type(2),
  div:nth-of-type(4) {
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      padding: 7.5px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: white;
    }
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > p:first-of-type {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 700;
    }
    & > p:last-of-type {
      color: #eb5757;
      font-size: 36px;
      font-weight: 700;

      & > span {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
`;

const OrderLink = styled(Link)`
  margin-bottom: 100px;
  text-decoration: none;
  text-decoration-line: none;

  &:visited,
  &:active {
    color: white;
  }
`;

const OrderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
  padding-bottom: 19px;
  width: 200px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  background-color: ${ColorObject.basic};
  cursor: pointer;
`;
