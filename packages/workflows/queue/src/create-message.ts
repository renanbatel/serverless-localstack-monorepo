import { APIGatewayProxyEvent } from 'aws-lambda';
import { badRequestResponse, getSQS, internalErrorResponse, LambdaResponse, resolveQueueUrl, successResponse } from 'sdk';

const { SQS_QUEUE } = process.env;

export async function apiGatewayHandler(event: APIGatewayProxyEvent): Promise<LambdaResponse> {
  const { content } = JSON.parse(event.body);

  if (!content) {
    return badRequestResponse();
  }

  try {
    const sqs = getSQS();
    const message = {
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
