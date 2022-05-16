import styled from '@emotion/styled';

const CompanyMenu = () => {
  return (
    <MenuWrapper>
      <Li>창고마켓 소개</Li>
      <Partition>|</Partition>
      <Li>이용약관</Li>
      <Partition>|</Partition>
      <BoldLi>개인정보처리방침</BoldLi>
      <Partition>|</Partition>
      <Li>전자금융거래약관</Li>
      <Partition>|</Partition>
      <Li>청소년보호정책</Li>
      <Partition>|</Partition>
      <Li>제휴문의</Li>
    </MenuWrapper>
  );
};

export default CompanyMenu;

const MenuWrapper = styled.ul`
  display: flex;
  padding-top: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid #c4c4c4;

  & > li {
    cursor: pointer;
  }
`;

const Li = styled.li`
  font-size: 14px;
  font-weight: 400;
`;

const Partition = styled.li`
  margin: 0px 14px;
`;

const BoldLi = styled.li`
  font-size: 14px;
  font-weight: 700;
`;
