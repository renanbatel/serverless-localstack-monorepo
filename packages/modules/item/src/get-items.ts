import { APIGatewayProxyEvent } from 'aws-lambda';
import { getDynamoDB, internalErrorResponse, successResponse } from 'sdk';

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  try {
    const dynamodb = getDynamoDB();
    const items = await dynamodb.scan({ TableName: process.env.DYNAMODB_TABLE }).promise();

    return successResponse(items);
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
