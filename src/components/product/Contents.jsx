import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { ColorObject } from '../../constants';
import { useParams } from 'react-router';
import { fetcher } from '../../utils/fetcher';

const Contents = () => {
  const postId = useParams().id;
  const [clicked, setClicked] = useState(1);
  const [productData, setProductData] = useState({
    info: '상세 설명이 없습니다.',
    review: '작성된 리뷰가 없습니다.',
    qna: '작성된 Q&A가 없습니다.',
    takeBack: '반품 및 교환이 불가능한 상품입니다.',
  });

  useEffect(() => {
    const presetData = async () => {
      const res = await fetcher(`products/${postId}`, 'GET');
      setProductData((current) => {
        return { ...current, ...res };
      });
    };

    presetData();
  }, [postId]);

  const changeContents = (value) => {
    setClicked(value);
  };

  const putContent = (clcik) => {
    if (clcik === 1) {
      return productData.product_info;
    } else if (clcik === 2) {
      return productData.review;
    } else if (clcik === 3) {
      return productData.qna;
    } else if (clcik === 4) {
      return productData.takeBack;
    }
  };

  return (
    <ContentsWrapper>
      <MainButtonWrapper clicked={clicked}>
        <button onClick={() => changeContents(1)}>설명</button>
        <button onClick={() => changeContents(2)}>리뷰</button>
        <button onClick={() => changeContents(3)}>Q&A</button>
        <button onClick={() => changeContents(4)}>반품/교환정보</button>
      </MainButtonWrapper>
      <MainContent>{putContent(clicked)}</MainContent>
    </ContentsWrapper>
  );
};

Contents.defaultProps = {
  info: '상세 설명이 없습니다.',
  review: '작성된 리뷰가 없습니다.',
  qna: '작성된 Q&A가 없습니다.',
  takeBack: '반품 및 교환이 불가능한 상품입니다.',
};

export default Contents;

const ContentsWrapper = styled.div`
  @media screen and (max-width: 1280px) {
    padding: 24px;
  }
`;

const MainButtonWrapper = styled.div`
  display: flex;

  & > button {
    padding-top: 19px;
    padding-bottom: 12px;
    width: 25%;
    border: none;
    border-bottom: 6px solid #c4c4c4;
    background-color: white;
    color: #767676;
    cursor: pointer;
  }

  & > button:nth-of-type(${(props) => props.clicked}) {
    color: ${ColorObject.basic};
    border-bottom: 6px solid ${ColorObject.basic};
  }
`;

const MainContent = styled.div`
  padding: 120px 0px;
`;
