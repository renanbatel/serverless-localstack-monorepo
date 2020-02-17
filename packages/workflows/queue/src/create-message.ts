import { APIGatewayProxyEvent } from 'aws-lambda';
import { badRequestResponse, getSQS, internalErrorResponse, successResponse } from 'sdk';
import { resolveQueueUrl } from 'sdk/src/aws/utils';
import uuid from 'uuid';

const { SQS_QUEUE } = process.env;

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  const { content } = JSON.parse(event.body);

  if (!content) {
    return badRequestResponse();
  }

  try {
    const sqs = getSQS();
    const message = {
      id: uuid.v4(),
      content,
    };

    await sqs
      .sendMessage({
        QueueUrl: resolveQueueUrl(SQS_QUEUE),
        MessageBody: JSON.stringify(message),
      })
      .promise();

    return successResponse(message);
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
