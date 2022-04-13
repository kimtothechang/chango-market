import styled from '@emotion/styled';

const BannerCard = ({ src, alt }) => {
  return <BannerImg src={src} alt={alt} />;
};

export default BannerCard;

const BannerImg = styled.img`
  object-fit: cover;
  width: 100%;
`;
