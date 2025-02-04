import { network } from 'hardhat';
import { HARDHAT_NETWORK_NAME } from 'hardhat/plugins';
import { provider } from 'hardhat';

export const SECONDS_IN_A_WEEK = 86400 * 7;

export const DEFAULT_SUBSCRIPTION_PERIOD_LENGTH = SECONDS_IN_A_WEEK;
export const DEFAULT_VALUATION_PERIOD_LENGTH = SECONDS_IN_A_WEEK;
export const DEFAULT_PAYMENT_PERIOD_LENGTH = SECONDS_IN_A_WEEK;

// ---------- Module to accelerate time -----------------------
export const advanceTime = (time: any) => {
  if (network.name !== HARDHAT_NETWORK_NAME) return;
  return provider.send('evm_increaseTime', [time]);
};

export const advanceBlock = () => {
  if (network.name !== HARDHAT_NETWORK_NAME) return;
  return provider.send('evm_mine', []);
};

export const advanceTimeAndBlock = async (time: any) => {
  await advanceTime(time);
  await advanceBlock();
  return Promise.resolve(provider.getBlock('latest'));
};

export const takeSnapshot = () => {
  if (network.name !== HARDHAT_NETWORK_NAME) return;
  return provider.send('evm_snapshot', []);
};

export const revertToSnapshot = (snapShotId: any) => {
  if (network.name !== HARDHAT_NETWORK_NAME) return;
  return provider.send('evm_revert', [snapShotId]);
};

// ---------- Module to accelerate time (end)------------------

export const nowSeconds = () => Math.floor(Date.now() / 1000);
export const nowMilliseconds = () => Date.now();

export const epochSeconds = (date: { getTime: () => number }) => {
  Math.floor(date.getTime() / 1000);
};

export const sleep = async (milliseconds: number | undefined) => {
  await new Promise((r) => setTimeout(r, milliseconds));
};

export const addDays = (date: string | number | Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
