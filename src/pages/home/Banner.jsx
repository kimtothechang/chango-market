import { useState } from 'react';
import styled from '@emotion/styled';
import BannerCard from './BannerCard';
import BannerButton from './BannerButton';
import { BASIC_PAGE_WIDTH } from '../../constants';

const dummyBannerImg = [
  {
    id: 0,
    src: `${process.env.PUBLIC_URL}/assets/banner/coding.png`,
    alt: '배너이미지',
    pixel: 0,
  },
  {
    id: 1,
    src: `${process.env.PUBLIC_URL}/assets/banner/guitar.png`,
    alt: '배너이미지',
    pixel: -parseInt(BASIC_PAGE_WIDTH, 10),
  },
];

const Banner = () => {
  // eslint-disable-next-line no-unused-vars
  const [caroucel, setCaroucel] = useState(0);
  const [activeImg, setActiveImg] = useState(1);

  const moveCaroucel = (move) => {
    setCaroucel(move.pixel);
    setActiveImg(move.id + 1);
  };

  return (
    <MyBanner>
      <ImgWrapper howMove={caroucel}>
        {dummyBannerImg.map((card) => (
          <BannerCard key={card.id} src={card.src} alt={card.alt} />
        ))}
      </ImgWrapper>
      <ButtonWrapper activated={activeImg}>
        {dummyBannerImg.map((card) => (
          <BannerButton key={card.id} onClick={() => moveCaroucel(card)} />
        ))}
      </ButtonWrapper>
    </MyBanner>
  );
};

export default Banner;

const MyBanner = styled.section`
  position: relative;
  margin: 0 auto;
  display: flex;
  width: ${BASIC_PAGE_WIDTH};
  height: 495px;
  background-color: #f2f2f2;
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  display: flex;
  transition: all 1s;
  transform: ${(props) => `translateX(${props.howMove}px)` || 'translateX(0px)'};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 50%);

  & > button:nth-of-type(${(props) => props.activated}) {
    background-color: black;
  }
`;
