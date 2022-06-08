import React, { ReactNode } from 'react';
import Logo from '../../svg/logo';
import MakerBurn from '../../svg/maker-burn';
import Makerdao from '../../svg/makerdao';

export type WebSiteLinks = {
  title: string
  logo: ReactNode | JSX.Element
  background?: string
  fontSize?: number
  color?: string
  fontWeight?: number
  link: string
  marginTop?: string
  marginBottom?: string
  fontFamily?: string
  lineHeight?: number
}

export const itemsWebSiteLinks: WebSiteLinks[] = [
  {
    title: 'Voting Portal',
    logo: <Logo />,
    background: '#231635',
    fontSize: 16,
    color: '#FFFFFF',
    link: 'https://vote.makerdao.com/',
    marginTop: '32px',
    marginBottom: '32px',
    fontFamily: 'SF Pro Display, sans-serif',
  },
  {
    title: 'Forum',
    logo: <Makerdao />,
    fontSize: 24,
    fontWeight: 400,
    color: '#1AAB9B',
    link: 'https://forum.makerdao.com/',
    marginBottom: '32px',
    fontFamily: 'SF Pro Display, sans-serif',
  },
  {
    title: 'MIPs Portal',
    logo: <Logo fill='#1AAB9B' />,
    background: '#1AAB9B;',
    fontSize: 16,
    fontWeight: 500,
    color: '#FFFFFF',
    link: 'https://mips.makerdao.com/',
    marginBottom: '32px',
    fontFamily: 'Roboto',
  },
  {
    title: 'makerburn.com',
    logo: <MakerBurn />,
    color: '#000000',
    fontFamily: 'Cantarell,sans-serif',
    lineHeight: 26,
    fontSize: 18,
    fontWeight: 500,
    link: 'https://makerburn.com/#/',
    marginBottom: '32px',
  }
];
