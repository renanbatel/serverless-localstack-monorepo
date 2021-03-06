import { APIGatewayProxyEvent } from 'aws-lambda';
import { badRequestResponse, getDynamoDB, internalErrorResponse, LambdaResponse, successResponse } from 'sdk';
import uuid from 'uuid';

const { DYNAMODB_TABLE } = process.env;

export async function createItem(content: string): Promise<LambdaResponse> {
  if (!content) {
    return badRequestResponse();
  }

  try {
    const dynamodb = getDynamoDB();
    const id = uuid.v4();
    const item = await dynamodb
      .put({
        TableName: DYNAMODB_TABLE,
        Item: {
          id,
          content,
        },
      })
      .promise();

    return successResponse({ item });
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}

export async function apiGatewayHandler(event: APIGatewayProxyEvent): Promise<LambdaResponse> {
  const { content } = JSON.parse(event.body);

  return createItem(content);
}

export async function invokeHandler(event: any): Promise<LambdaResponse> {
  const { content } = event;

  return createItem(content);
}
