import { APIGatewayProxyEvent } from 'aws-lambda';
import { badRequestResponse, getDynamoDB, internalErrorResponse, successResponse } from 'sdk';

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  try {
    const dynamodb = getDynamoDB();
    const users = await dynamodb.scan({ TableName: process.env.DYNAMODB_TABLE }).promise();

    return successResponse(users);
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
