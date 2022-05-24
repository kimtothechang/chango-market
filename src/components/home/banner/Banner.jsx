import { useState, memo } from 'react';
import styled from '@emotion/styled';
import BannerCard from './BannerCard';
import BannerButton from './BannerButton';
import { BASIC_PAGE_WIDTH } from '../../../constants';

const dummyBannerImg = [
  {
    id: 0,
    src: `${process.env.PUBLIC_URL}/assets/banner/banner1.jpg`,
    alt: '배너이미지',
  },
  {
    id: 1,
    src: `${process.env.PUBLIC_URL}/assets/banner/banner2.jpg`,
    alt: '배너이미지',
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL}/assets/banner/banner3.jpg`,
    alt: '배너이미지',
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL}/assets/banner/banner4.jpg`,
    alt: '배너이미지',
  },
];

const Banner = () => {
  const [caroucel, setCaroucel] = useState(0);
  const [activeImg, setActiveImg] = useState(1);

  const moveCaroucel = (move) => {
    setCaroucel(move.id);
    setActiveImg(move.id + 1);
  };

  const movePrevCaroucel = () => {
    setCaroucel((current) => {
      if (current > 0) {
        return current - 1;
      } else {
        return dummyBannerImg.length - 1;
      }
    });
    setActiveImg((current) => {
      if (current > 1) {
        return current - 1;
      } else {
        return dummyBannerImg.length;
      }
    });
  };

  const moveNextCaroucel = () => {
    setCaroucel((current) => {
      if (current < dummyBannerImg.length - 1) {
        return current + 1;
      } else {
        return 0;
      }
    });
    setActiveImg((current) => {
      if (current < dummyBannerImg.length) {
        return current + 1;
      } else {
        return 1;
      }
    });
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
      <PrevButton onClick={() => movePrevCaroucel()}>{'<'}</PrevButton>
      <NextButton onClick={() => moveNextCaroucel()}>{'>'}</NextButton>
    </MyBanner>
  );
};

export default memo(Banner);

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  color: rgba(0, 0, 0, 0.75);
  font-size: 32px;
  width: 5%;
  height: 10%;
  border: none;
  background-color: transparent;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  color: rgba(0, 0, 0, 0.5);
  font-size: 32px;
  width: 5%;
  height: 10%;
  border: none;
  background-color: transparent;
`;

const MyBanner = styled.section`
  position: relative;
  margin: 0 auto;
  display: flex;
  max-width: ${BASIC_PAGE_WIDTH};
  max-height: 495px;
  background-color: #f2f2f2;
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  transition: all 1s;
  transform: ${(props) => `translateX(calc(-${props.howMove} * 100%))`};
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
