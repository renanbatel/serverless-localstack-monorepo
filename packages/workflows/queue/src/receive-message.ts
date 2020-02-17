import { SQSEvent } from 'aws-lambda';
import { badRequestResponse, internalErrorResponse, invoke, InvokeFns, LambdaResponse, successResponse } from 'sdk';

export async function sqsHandler(event: SQSEvent): Promise<LambdaResponse> {
  const { content } = JSON.parse(event.Records[0].body);

  if (!content) {
    return badRequestResponse('Missing parameters in message body.');
  }

  try {
    await invoke(InvokeFns.createItem, {
      content: `${content} (SQS)`,
    });

    return successResponse({
      message: 'SQS Message processed.',
    });
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
