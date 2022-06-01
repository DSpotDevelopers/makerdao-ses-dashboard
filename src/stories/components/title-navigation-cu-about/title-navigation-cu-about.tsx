import React from 'react';
import styled from '@emotion/styled';
import { Avatar, Theme, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuTableColumnLinks, LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuAbout, CuMip } from '../../containers/cu-about/cu-about.api';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { getColorForString } from '../../../core/utils/color.utils';
import { getTwoInitials } from '../../../core/utils/string.utils';
import { CategoryChip } from '../category-chip/category-chip';

interface BudgetStatementFTEs {
  month: string
  ftes: number
}

interface BudgetStatement {
  budgetStatementFTEs: BudgetStatementFTEs[]
}
export interface SocialMediaChannels {
  cuCode: string;
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
}

export interface CoreUnit {
  code: string;
  name: string;
  image: string;
  category: [];
  cuMip: CuMip[];
  budgetStatements: BudgetStatement[];
  socialMediaChannels: SocialMediaChannels[];
  contributorCommitment: [];
  cuGithubContribution: [];
  roadMap: [];
}
interface Props {
  coreUnitAbout: CuAbout;
}

export const getMipsStatus = (mip: CuMip) => {
  switch (mip.mipStatus) {
    case CuStatusEnum.Accepted:
      return mip.accepted;
    case CuStatusEnum.FormalSubmission:
      return mip.formalSubmission;
    case CuStatusEnum.Rejected:
      return mip.rejected;
    case CuStatusEnum.RFC:
      return mip.rfc;
    default:
      return mip.rejected;
  }
};

export const getLinksCoreUnit = (cu: CuAbout) => {
  const links: LinkModel[] = [];
  if (cu.socialMediaChannels.length === 0) return links;
  const cont = cu.socialMediaChannels[0];
  if (cont.website) {
    links.push({
      linkType: LinkTypeEnum.WWW,
      href: cont.website,
    });
  }
  if (cont.forumTag) {
    links.push({
      linkType: LinkTypeEnum.Forum,
      href: cont.forumTag,
    });
  }
  if (cont.discord) {
    links.push({
      linkType: LinkTypeEnum.Discord,
      href: cont.discord,
    });
  }
  if (cont.twitter) {
    links.push({
      linkType: LinkTypeEnum.Twitter,
      href: cont.twitter,
    });
  }
  if (cont.youtube) {
    links.push({
      linkType: LinkTypeEnum.Youtube,
      href: cont.youtube,
    });
  }
  if (cont.linkedIn) {
    links.push({
      linkType: LinkTypeEnum.LinkedIn,
      href: cont.linkedIn,
    });
  }
  return links;
};

export const TitleNavigationCuAbout = ({ coreUnitAbout }: Props) => {
  if (!coreUnitAbout || !coreUnitAbout.cuMip) return null;
  const mips = getMipsStatus(coreUnitAbout.cuMip[0] || '');
  const mipStatus = coreUnitAbout.cuMip[0] && coreUnitAbout.cuMip[0].mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
  return (
    <Container>
      <CircleContainer>
        {coreUnitAbout.image && <Avatar style={{
          width: '68px',
          height: '68px'
        }} src={coreUnitAbout.image} />}
        {!coreUnitAbout.image && <Avatar sx={{ bgcolor: getColorForString(coreUnitAbout.name) }} style={{
          width: '68px',
          height: '68px',
          fontSize: '1rem'
        }}>{getTwoInitials(coreUnitAbout.name) || 'CU'}</Avatar>}
      </CircleContainer>
      <ContainerColum>
        <ContainerTitle>
          <ContainerSeparateData>
            <TypographySES>SES</TypographySES>
            {coreUnitAbout.name && <TypographyTitle>{coreUnitAbout.name}</TypographyTitle>}

            {mips && <StatusChip status={mipStatus as CuStatusEnum} />}
            <Row>
              {newDate && <CustomPopover
                id={'mouse-over-popover-goto'}
                title={'Go to MIPs Portal'}
              >
                {newDate &&
                  <SinceDate
                    href={'#'}
                  >
                    Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}
                  </SinceDate>
                }
              </CustomPopover>}
            </Row>
          </ContainerSeparateData>
        </ContainerTitle>
        <CategoryContainer>{coreUnitAbout.category && coreUnitAbout.category.map((item) => <CategoryChip key={item} category={item} style={{ marginRight: '16px' }} />)}</CategoryContainer>
      </ContainerColum>
      <ContainerLinksSpace>
        <ContainerLinks>
          <CuTableColumnLinks links={getLinksCoreUnit(coreUnitAbout)} dark spacingsRight={29} />
        </ContainerLinks>
      </ContainerLinksSpace>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  fontWeight: 400,
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

const TypographyTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  color: '#000000',
  marginLeft: '16px',
  marginRight: '24px'
});

const TypographySES = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  color: '#9FAFB9'
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '32px',
});

const SinceDate = styled.a(({ theme }) => ({
  fontFamily: (theme as Theme).typography.fontFamily,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft: '4px',
}));

const ContainerLinks = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '272px',
});
const CircleContainer = styled.div({
  marginRight: '10px',
});

const ContainerColum = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
});

const ContainerLinksSpace = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
});

const CategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '16px'
});

const ContainerSeparateData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
});

export default TitleNavigationCuAbout;
