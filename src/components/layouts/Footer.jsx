import styled from '@emotion/styled';

import { BASIC_PAGE_WIDTH } from '../../constants';

import CompanyMenu from './footer/CompanyMenu';
import CompanyInfo from './footer/CompanyInfo';

const Footer = () => {
  return (
    <FooterBackGround>
      <FooterWrapper>
        <CompanyMenu />
        <CompanyInfo />
      </FooterWrapper>
    </FooterBackGround>
  );
};

export default Footer;

const FooterBackGround = styled.footer`
  background-color: #f2f2f2;

  @media screen and (max-width: 1280px) {
    padding: 24px;
  }
`;

const FooterWrapper = styled.section`
  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
`;
