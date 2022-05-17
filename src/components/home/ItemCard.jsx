import styled from '@emotion/styled';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ img, alt, seller, product, price, id }) => {
  const addComma = (num) => {
    return parseInt(num, 10).toLocaleString();
  };

  return (
    <CardWrapper>
      <Link to={`/products/${id}`} id={id}>
        <ProductImg src={img} alt={alt} />
      </Link>
      <ProductSeller>{seller}</ProductSeller>
      <ProductTitle>{product}</ProductTitle>
      <ProductPrice>
        {addComma(price)}
        <span>원</span>
      </ProductPrice>
    </CardWrapper>
  );
};

export default memo(ItemCard);

const CardWrapper = styled.div`
  flex-basis: 300px;
  flex-grow: 1;
  max-width: 29%;

  @media screen and (max-width: 1095px) {
    max-width: 46%;
  }

  @media screen and (max-width: 715px) {
    max-width: 100%;
  }
`;

const StyledLink = styled(Link)``;

const ProductImg = styled.div`
  flex-grow: 1;
  min-height: 300px;
  margin-bottom: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  background-image: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ProductSeller = styled.p`
  margin-bottom: 10px;
  color: #767676;
  font-size: 16px;
  font-weight: 400;
`;

const ProductTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 400;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;

  & > span {
    margin-left: 2px;
    font-size: 16px;
    font-weight: 400;
  }
`;
