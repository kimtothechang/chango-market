import styled from '@emotion/styled';

const ItemCard = ({ img, alt, seller, product, price }) => {
  const addComma = (num) => {
    return parseInt(num, 10).toLocaleString();
  };

  return (
    <CardWrapper>
      <ProductImg src={img} alt={alt} />
      <ProductSeller>{seller}</ProductSeller>
      <ProductTitle>{product}</ProductTitle>
      <ProductPrice>
        {addComma(price)}
        <span>원</span>
      </ProductPrice>
    </CardWrapper>
  );
};

export default ItemCard;

const CardWrapper = styled.div``;

const ProductImg = styled.img`
  width: 380px;
  height: 380px;
  margin-bottom: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
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
