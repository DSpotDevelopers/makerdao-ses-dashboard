import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

interface Props {
  onClick?: () => void;
  title?: string;
}

const SmallButton = ({ onClick, title = 'Back' }: Props) => {
  return (
    <StyledSmallButton onClick={onClick} >{title}</StyledSmallButton>
  );
};

const StyledSmallButton = styled(Button)({
  display: 'flex',
  borderRadius: '8px',
  flexDirection: 'row',
  backgroundColor: '#C4C4C4',
  minWidth: '45px',
  height: '23px',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#25273D',
  padding: '4px 8px',
  textTransform: 'none',
  ':hover': {
    backgroundColor: '#C4C4C4'
  }
});

export default SmallButton;
