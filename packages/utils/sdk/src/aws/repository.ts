import { DynamoDB, Lambda, SQS } from 'aws-sdk';

import { loadLocalstackConfig } from './localstack-config';

const { ENV_STAGE } = process.env;

if (ENV_STAGE === 'local') {
  loadLocalstackConfig();
}

const dynamodb = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const sqs = new SQS({ apiVersion: '2012-11-05' });
const lambda = new Lambda({ apiVersion: '2015-03-31' });

export function getDynamoDB(): DynamoDB.DocumentClient {
  return dynamodb;
}

export function getSQS(): SQS {
  return sqs;
}

export function getLambda(): Lambda {
  return lambda;
}
