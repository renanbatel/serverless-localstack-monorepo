import { APIGatewayProxyEvent } from 'aws-lambda';
import { badRequestResponse, getDynamoDB, internalErrorResponse, successResponse } from 'sdk';
import uuid from 'uuid';

const { DYNAMODB_TABLE } = process.env;

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  const { content } = JSON.parse(event.body);

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
