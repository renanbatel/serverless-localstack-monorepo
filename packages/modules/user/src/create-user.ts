import { APIGatewayProxyEvent } from "aws-lambda";
import { getDynamoDB, successResponse, badRequestResponse, internalErrorResponse } from 'sdk';

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return badRequestResponse();
  }

  try {
    const dynamodb = getDynamoDB();
    const user = await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        username,
        password,
      },
    }).promise();

    return successResponse({ user });
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
