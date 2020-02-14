import { APIGatewayProxyEvent } from 'aws-lambda';
import { badRequestResponse, internalErrorResponse, successResponse } from 'sdk';

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  const { content } = JSON.parse(event.body);

  if (!content) {
    return badRequestResponse();
  }

  try {
    return successResponse({ content });
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
