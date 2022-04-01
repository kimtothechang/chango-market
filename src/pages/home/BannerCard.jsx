import styled from '@emotion/styled';
import { BASIC_PAGE_WIDTH } from '../../constants';

const BannerCard = ({ src, alt }) => {
  return <BannerImg src={src} alt={alt} />;
};

export default BannerCard;

const BannerImg = styled.img`
  width: ${BASIC_PAGE_WIDTH};
`;
