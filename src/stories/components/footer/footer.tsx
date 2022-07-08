import styled from '@emotion/styled';
import React from 'react';
import Logo from '../svg/logo';
import SesLogo from '../svg/ses-logo';
import DescriptionFooter from './description-footer';
import FooterContact from './footer-contact';
import { iconsContact, iconsSupport } from './iconsData';

interface Props {
  governesses: string[],
  products: string[],
  developer: string[]
}

const Footer = ({ governesses, products, developer }: Props) => {
  return (
    <div style={{
      position: 'relative',
    }}>
      <ContainerImage />
      <ContainerFooter>
        <ContainerColumOne ><FooterContact title='Contact MakerDAO' subtitle='Official Community Channels' style={{
          paddingLeft: '6px',
          paddingRight: '6.3px',
        }} logo={<Logo width={37} height={20}
        />} links={iconsContact} /></ContainerColumOne>
        <ContainerColumTwo> <DescriptionFooter title='Governance' children={governesses} style={{
        }} /></ContainerColumTwo>
        <ContainerColumThree>  <DescriptionFooter title='Products & Tools' children={products} style={{

        }} /></ContainerColumThree>
        <ContainerColumFour> <DescriptionFooter title='Developer' children={developer} style={{
        }} /> </ContainerColumFour>
        <ContainerColumLast>
          <FooterContact title='Contact MakerDAO SES for support' subtitle='Sustainable Ecosystem Scalling' style={{
            paddingLeft: '6.13px',
            paddingRight: '6px',
          }}
            logo={<SesLogo />} links={iconsSupport}
          />
        </ContainerColumLast>
      </ContainerFooter >
    </div >

  );
};

const ContainerImage = styled.div({
  width: '100%',
  height: '100%',
  left: '50%',
  zIndex: -1,
  transform: 'translate(-50%)',
  backgroundImage: 'url(/assets/img/bg_footer_light.jpeg)',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center bottom',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
});

const ContainerFooter = styled.footer({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  margin: '0px',
  minWidth: '0px',
  width: '100%',
  paddingTop: '40.07px',
  paddingLeft: '63.77px',
  paddingRight: '64.23px',
  paddingBottom: '57.59px',
});
const ContainerColumOne = styled.div({
  width: '320.01px',
});
const ContainerColumTwo = styled.div({
  width: '143px'
});
const ContainerColumThree = styled.div({
  width: '147px'
});
const ContainerColumFour = styled.div({
  width: '129px'

});

const ContainerColumLast = styled.div({
  width: '272px',
});
export default Footer;
