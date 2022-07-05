import React, { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyForecastMvvm } from './transparency-forecast.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';
import _ from 'lodash';

interface TransparencyForecastProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyForecast = (props: TransparencyForecastProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);

  const {
    getForecastForMonthOnWalletOnBudgetStatement,
    getBudgetCapForMonthOnWalletOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapSumOfMonthsOnWallet,
    getForecastSumForMonth,
    getForecastSumForMonths,
    getBudgetCapForMonthOnBudgetStatement,
    getTotalQuarterlyBudgetCapOnBudgetStatement,
    forecastTableHeaders,
    firstMonth,
    secondMonth,
    thirdMonth,
    breakdownTabs,
    getLineItemsForWalletOnMonth,
    getLineItemForecastSumForMonth,
    getLineItemForecastSumForMonths,
    getBudgetCapForMonthOnLineItem,
    getTotalQuarterlyBudgetCapOnLineItem,
    wallets
  } = useTransparencyForecastMvvm(props.currentMonth, props.budgetStatements);

  const forecastTableItems: JSX.Element[][] = useMemo(() => {
    const result: JSX.Element[][] = [];

    if (!props.budgetStatements || props.budgetStatements.length === 0) return result;

    wallets.forEach(wallet => {
      result.push([
          <WalletTableCell key={1} name={wallet.name} wallet={formatAddressForOutput(wallet.address ?? '')}/>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address, props.currentMonth, firstMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address, props.currentMonth, secondMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address, props.currentMonth, thirdMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}>{getForecastSumOfMonthsOnWallet(props.budgetStatements, wallet?.address, props.currentMonth, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>{getBudgetCapForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address, props.currentMonth, props.currentMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}>{getBudgetCapSumOfMonthsOnWallet(props.budgetStatements, wallet?.address, props.currentMonth, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
          <TableCell key={8}>
            <CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={`https://etherscan.io/address/${wallet.address}`} style={{ marginRight: '16px' }}>Etherscan</CustomLink>
            <CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={`https://gnosis-safe.io/app/eth:${wallet.address}`}>Gnosis</CustomLink>
          </TableCell>
      ]);
    });

    result.push([
      <TableCell key={1}><b>Total</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}><b>{getForecastSumForMonth(props.budgetStatements, props.currentMonth, firstMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}><b>{getForecastSumForMonth(props.budgetStatements, props.currentMonth, secondMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}><b>{getForecastSumForMonth(props.budgetStatements, props.currentMonth, thirdMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}><b>{getForecastSumForMonths(props.budgetStatements, props.currentMonth, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}><b>{getBudgetCapForMonthOnBudgetStatement(props.budgetStatements, props.currentMonth, props.currentMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}><b>{getTotalQuarterlyBudgetCapOnBudgetStatement(props.budgetStatements, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={8}/>,
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements]);

  const breakdownHeaders = useMemo(() => {
    return ['Budget Category', firstMonth.toFormat('MMMM'), secondMonth.toFormat('MMMM'), thirdMonth.toFormat('MMMM'), '3 Months', 'Monthly Budget', 'Quarterly Budget Cap'];
  }, [props.currentMonth, props.budgetStatements]);

  const breakdownItems = useMemo(() => {
    const result: JSX.Element[][] = [];

    if (!props.budgetStatements || props.budgetStatements.length === 0) return result;
    if (!wallets.length) {
      return result;
    }

    const currentWalletAddress = wallets[thirdIndex]?.address ?? '';

    const ungrouped = [
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, firstMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, secondMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, thirdMonth, currentWalletAddress),
    ];

    result.push([
      <TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>,
    ]);

    const groupedHeadCount = _.groupBy(ungrouped.filter(x => x.headcountExpense), item => item.budgetCategory);

    for (const groupedKey in groupedHeadCount) {
      result.push([
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={1}>{groupedKey}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>{getLineItemForecastSumForMonth(groupedHeadCount[groupedKey], firstMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>{getLineItemForecastSumForMonth(groupedHeadCount[groupedKey], secondMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>{getLineItemForecastSumForMonth(groupedHeadCount[groupedKey], thirdMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}>{getLineItemForecastSumForMonths(groupedHeadCount[groupedKey], [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>{getBudgetCapForMonthOnLineItem(groupedHeadCount[groupedKey], props.currentMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}>{getTotalQuarterlyBudgetCapOnLineItem(groupedHeadCount[groupedKey], [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
      ]);
    }

    result.push([
      <TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>,
    ]);

    const groupedNonHeadCount = _.groupBy(ungrouped.filter(x => !x.headcountExpense), item => item.budgetCategory);

    for (const groupedKey in groupedNonHeadCount) {
      result.push([
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={1}>{groupedKey}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>{getLineItemForecastSumForMonth(groupedNonHeadCount[groupedKey], firstMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>{getLineItemForecastSumForMonth(groupedNonHeadCount[groupedKey], secondMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>{getLineItemForecastSumForMonth(groupedNonHeadCount[groupedKey], thirdMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}>{getLineItemForecastSumForMonths(groupedNonHeadCount[groupedKey], [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>{getBudgetCapForMonthOnLineItem(groupedNonHeadCount[groupedKey], props.currentMonth).toLocaleString()}</TableCell>,
        <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}>{getTotalQuarterlyBudgetCapOnLineItem(groupedNonHeadCount[groupedKey], [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
      ]);
    }

    result.push([
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={1}><b>Total</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}><b>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, currentWalletAddress, props.currentMonth, firstMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}><b>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, currentWalletAddress, props.currentMonth, secondMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}><b>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, currentWalletAddress, props.currentMonth, thirdMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}><b>{getForecastSumOfMonthsOnWallet(props.budgetStatements, currentWalletAddress, props.currentMonth, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}><b>{getBudgetCapForMonthOnWalletOnBudgetStatement(props.budgetStatements, currentWalletAddress, props.currentMonth, props.currentMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}><b>{getBudgetCapSumOfMonthsOnWallet(props.budgetStatements, currentWalletAddress, props.currentMonth, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</b></TableCell>,
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements, thirdIndex]);

  return <Container>
    <Title style={{
      marginBottom: '32px'
    }}>
      {props.currentMonth.toFormat('MMM yyyy')} Totals
    </Title>

    <InnerTable
      headers={forecastTableHeaders}
      items={forecastTableItems}
      minWidth={80}
      headersAlign={['left', 'right', 'right', 'right', 'right', 'right', 'right', 'left']}
      headerWidths={['unset', 'unset', 'unset', 'unset', 'unset', 'unset', 'unset', '224px']}
      headerStyles={[{}, {}, {}, {}, { paddingLeft: 0 }, { paddingLeft: 0 }, { paddingLeft: 0 }, {}]}
      style={{ marginBottom: '64px' }}
    />

    <Title style={{
      marginBottom: '32px'
    }}>
      {props.currentMonth.toFormat('MMM yyyy')} Breakdown
    </Title>

    <Tabs
      items={breakdownTabs}
      currentIndex={thirdIndex}
      onChange={setThirdIndex}
      style={{
        marginBottom: '32px',
      }}
    />

    <InnerTable
        headers={breakdownHeaders}
        items={breakdownItems}
        style={{ marginBottom: '64px' }}
        minWidth={80}
        headersAlign={['left', 'right', 'right', 'right', 'right', 'right', 'right']}
    />
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
