import React from 'react';
import styled from '@emotion/styled';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomLink } from '../custom-link/custom-link';

interface WalletTableCellProps {
  imgUrl?: string,
  name: string,
  wallet: string,
  walletUrl: string
}

export const WalletTableCell = (props: WalletTableCellProps) => {
  return <Container>
    <CircleAvatar
      width={'32px'}
      height={'32px'}
      name={props.name}
      image={props.imgUrl}
      style={{ margin: '0 16px' }}
    />
    <Data>
      <Label>{props.name}</Label>
      <CustomLink
        href={props.walletUrl}
        fontSize={14}
        fontWeight={400}
        withArrow={false}>
        {props.wallet}
      </CustomLink>
    </Data>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Data = styled.div({});

const Label = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#231536',
  marginBottom: '4px'
});
