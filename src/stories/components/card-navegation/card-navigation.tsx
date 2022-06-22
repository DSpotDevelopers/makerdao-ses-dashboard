import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions } from '@mui/material';
import styled from '@emotion/styled';
import ArrowRight from '../svg/ArrowRight';
interface Props {
  description: string;
  image?: string;
  icon?: string;
  list?: string[];
  title?: string;
  titleLinkPage?: string;
  onClick?: () => void
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NavigationCard = ({ description, image, list = [], title = '', titleLinkPage = '', onClick = () => { } }: Props) => {
  return (
    <>
      {!!title && <ArrowTittleStyle>
        <Typography color='#231536' fontSize={24} lineHeight='29px' fontWeight={500}>{title}</Typography>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '198px'
        }}>
          <Typography textAlign='right' fontStyle='normal' fontWeight={400} fontSize={20} color='#231536'>{titleLinkPage}</Typography>
          <ArrowRight width={16} height={16} style={{ marginLeft: '22px' }} onClick={onClick} />
        </div>
      </ArrowTittleStyle>
      }
      <Box sx={{
        maxWidth: '88.38%',
        maxHeight: '293px',
      }}>
        <CardContainer sx={{
          p: '15px',
        }
        } >
          <FiCardActionArea>
            <FiCardMedia
              sx={{
                borderRadius: '6px',
                padding: '0px',
              }}
              image={image}
            />
            <FiCardContent sx={{
              p: '0px',
            }}>
              <UnorderedList>
                {list.map((item, index) => <ListItemStyle key={index} >{item}</ListItemStyle>)}
              </UnorderedList>
            </FiCardContent>
          </FiCardActionArea>
          <FiCardActions>
            <TypographyStyle
            >
              {description}
            </TypographyStyle>
          </FiCardActions>
        </CardContainer>
      </Box >
    </>
  );
};

const CardContainer = styled(Card)({
  position: 'relative',
});

const FiCardActionArea = styled(CardActionArea)({
  position: 'relative',
  width: '373px'
});

const FiCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  width: '100%',
});

const FiCardContent = styled(CardContent)({
  position: 'relative',
  backgroundColor: 'transparent',
  color: '#ffffff',
});
const FiCardActions = styled(CardActions)({
  position: 'relative'
});

const ListItemStyle = styled.li({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  marginBottom: '19px',
  '&:first-of-type': {
    marginTop: '24px',
  },
  '&:last-child': {
    marginBottom: '24px',
  }
});

const UnorderedList = styled.ul({
  marginTop: '0px',
  marginBottom: '0px',
});

const TypographyStyle = styled(Typography)({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  marginTop: '16px',
  color: '#231536',
});

const ArrowTittleStyle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  marginBottom: '32px',
});

export default NavigationCard;
