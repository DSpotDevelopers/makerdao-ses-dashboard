import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import mainTheme from '../../../core/styling/main-theme';
import Header from '../../components/header/Header';
import { itemsWebSiteLinks } from '../../components/header/select-link-website/menu-items';
import styled from '@emotion/styled';
import menuItems from '../../components/header/menu-items';
import Footer from '../../components/footer/footer';
import { developer, governesses, products } from '../../components/footer/iconsData';

interface HeaderWrapperProps {
  children?: JSX.Element | JSX.Element[]
}
export const HeaderWrapper = (props: HeaderWrapperProps) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Header menuItems={menuItems} links={itemsWebSiteLinks} />
      <Container>
        <CssBaseline />
        {props.children}
      </Container>
      <Footer developer={developer} governesses={governesses} products={products}/>
    </ThemeProvider>
  );
};

const Container = styled.div({
  display: 'flex',
  background: 'white',
});
