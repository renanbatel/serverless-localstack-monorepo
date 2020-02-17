import { DynamoDB, SQS } from 'aws-sdk';

import { loadLocalstackConfig } from './localstack-config';

const { ENV_STAGE } = process.env;

if (ENV_STAGE === 'local') {
  loadLocalstackConfig();
}

const dynamodb = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const sqs = new SQS({ apiVersion: '2012-11-05' });

export function getDynamoDB(): DynamoDB.DocumentClient {
  return dynamodb;
}

export function getSQS(): SQS {
  return sqs;
}
