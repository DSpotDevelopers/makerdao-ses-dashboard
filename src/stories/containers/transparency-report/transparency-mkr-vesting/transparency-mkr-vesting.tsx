import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { TableCell } from '../../../components/table-cell/table-cell';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyMkrVesting } from './transparency-mkr-vesting.mvvm';
import { NumberCell } from '../../../components/number-cell/number-cell';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyMkrVesting = (props: TransparencyMkrVestingProps) => {
  const {
    mkrVestings,
    totalAmount,
    totalOldAmount
  } = useTransparencyMkrVesting(props.currentMonth, props.budgetStatements);

  const items = useMemo(() => {
    const result: JSX.Element[][] = [];

    mkrVestings?.forEach(mkr => {
      result.push([
        <TableCell>{mkr.vestingDate}</TableCell>,
        <NumberCell>{mkr.mkrAmount?.toLocaleString()}</NumberCell>,
        <NumberCell>{mkr.mkrAmountOld?.toLocaleString()}</NumberCell>,
        <NumberCell>{(Number(mkr.mkrAmount) - Number(mkr.mkrAmountOld)).toLocaleString()}</NumberCell>,
        <NumberCell>{mkr.comments}</NumberCell>,
      ]);
    });

    result.push([
      <TableCell><b>Total</b></TableCell>,
      <NumberCell><b>{totalAmount.toLocaleString()}</b></NumberCell>,
      <NumberCell><b>{totalOldAmount.toLocaleString()}</b></NumberCell>,
      <NumberCell><b>{(Number(totalAmount) - Number(totalOldAmount)).toLocaleString()}</b></NumberCell>,
      <NumberCell/>
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements]);

  return <Container>
    <Title marginBottom={32}>MKR Vesting Overview</Title>
    <TotalFte>
      <span>Total FTE</span>
      <u>10</u>
    </TotalFte>
    <InnerTable
      headers={['Vesting Date', 'MKR Amount', 'Last month', 'difference', 'reason(s)']}
      headersAlign={['left', 'right', 'right', 'right', 'left']}
      headerStyles={[{}, {}, {}, {}, { paddingLeft: '38px' }]}
      items={items}
      minWidth={200}
      headerWidths={['200px', '210px', '210px', '210px', '354px']}
      style={{ marginBottom: '32px' }}
    />
    <Text>
      This Overview is based on MIP40c3-SP17, SES’ MKR Incentive Proposal.
    </Text>
    <Text style={{ marginBottom: '90px' }}>
      The Difference column indicates any changes in the MKR vesting amounts compared to last month, with the Reason(s) column indicating why the amounts
      changed. Reasons may include: New hires, FTE changes, Promotions, or Terminations.
    </Text>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const TotalFte = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  color: '#231536',
  marginBottom: '36px',
  '> span': {
    marginRight: '16px'
  },
  '> u': {
    fontSize: '20px',
    paddingBottom: '2px',
    lineHeight: '24px',
    textDecoration: 'none',
    color: '#25273D',
    borderBottom: '1px solid #231536'
  }
});

const Text = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  color: '#231536',
  marginBottom: '16px'
});
