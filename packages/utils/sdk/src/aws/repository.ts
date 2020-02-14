import { DynamoDB } from 'aws-sdk';

import { loadLocalstackConfig } from './localstack-config';

const { ENV_STAGE } = process.env;

if (ENV_STAGE === 'local') {
  loadLocalstackConfig();
}

const dynamodb = new DynamoDB.DocumentClient();

export function getDynamoDB(): DynamoDB.DocumentClient {
  return dynamodb;
}
