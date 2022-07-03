import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useMemo } from 'react';
import { DateTime } from 'luxon';

export const useTransparencyActualsMvvm = (thirdIndex: number, setThirdIndex: (index: number) => void, propsCurrentMonth: DateTime, budgetStatements?: BudgetStatementDto[]) => {
  const currentMonth = useMemo(() => propsCurrentMonth.toFormat('yyyy-MM-01'), [propsCurrentMonth]);

  const getWalletForecast = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === currentMonth), i => i.forecast ?? 0);
  };

  const getWalletActual = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === currentMonth), i => i.actual ?? 0);
  };

  const getWalletDifference = (wallet: BudgetStatementWalletDto) => {
    return (getWalletForecast(wallet) - getWalletActual(wallet));
  };

  const currentBudgetStatement = useMemo(() => {
    setThirdIndex(0);
    return budgetStatements?.find(x => x.month === currentMonth) ?? null;
  }, [propsCurrentMonth]);

  const breakdownHeaders = useMemo(() => {
    return currentBudgetStatement?.budgetStatementWallet?.map(wallet => wallet.name);
  }, [currentBudgetStatement]);

  const budgetTotalForecast = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem.filter(item => item.month === currentMonth), item => item?.forecast ?? 0));
  }, [currentBudgetStatement]);

  const budgetTotalActual = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem.filter(item => item.month === currentMonth), item => item?.actual ?? 0));
  }, [currentBudgetStatement]);

  const budgetTotalDifference = useMemo(() => {
    return budgetTotalForecast - budgetTotalActual;
  }, [currentBudgetStatement]);

  const formatAddressForOutput = (address: string | undefined) => {
    if (!address) { return ''; }
    return `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length - 1)}`;
  };

  const getGroupForecast = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group.filter(item => item.month === currentMonth), item => item.forecast ?? 0);
  };

  const getGroupActual = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group.filter(item => item.month === currentMonth), item => item.actual ?? 0);
  };

  const getGroupDifference = (group: BudgetStatementLineItemDto[]) => {
    return getGroupForecast(group) - getGroupActual(group);
  };

  const getCommentsFromCategory = (group: BudgetStatementLineItemDto[]) => {
    return group.filter(item => item.month === currentMonth).reduce((current, next) => `${current} ${next.comments}`, '');
  };

  return {
    currentBudgetStatement,
    formatAddressForOutput,
    getWalletForecast,
    getWalletActual,
    getWalletDifference,
    budgetTotalForecast,
    budgetTotalActual,
    budgetTotalDifference,
    getGroupForecast,
    getGroupActual,
    getGroupDifference,
    getCommentsFromCategory,
    breakdownHeaders
  };
};
