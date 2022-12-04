/* eslint-disable @typescript-eslint/prefer-for-of */
import { OnTransactionHandler } from '@metamask/snap-types';
import { fetchUrl } from './insights';
import { TransactionObject } from './types';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  const metamaskFromAddress = (transaction as TransactionObject).from;

  const feedsUrl = `https://backend-staging.epns.io/apis/v1/users/eip155:5:${metamaskFromAddress}/feeds`;

  const data: any = await fetchUrl(feedsUrl);

  const fromDb = undefined;

  let dataChannelObject = fromDb || {};

  // processing of multiple subscribed channels
  for (let i = 0; i < data.feeds.length; i++) {
    const feeds = data.feeds[i];
    if (dataChannelObject[feeds.payload.data.app] == undefined) {
      dataChannelObject[feeds.payload.data.app] = feeds.payload.data.amsg;
    }
  }

  return {
    insights: dataChannelObject
  };
};
