import styled from '@emotion/styled';

const CompanyInfo = () => {
  return (
    <InfoWrapper>
      <p>Chango Market Inc.</p>
      <p>인천광역시 창휘로 00</p>
      <p>사업자 번호 000-00-00000 | 상품유통업</p>
      <p>대표: 김창고</p>
    </InfoWrapper>
  );
};

export default CompanyInfo;

const InfoWrapper = styled.article`
  padding-top: 30px;
  padding-bottom: 63px;

  & > p {
    color: #767676;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }

  & > p:first-of-type {
    font-weight: 700;
  }
`;
