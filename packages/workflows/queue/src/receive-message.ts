import { SQSEvent } from 'aws-lambda';
import { badRequestResponse, getDynamoDB, internalErrorResponse, successResponse } from 'sdk/src';

const { DYNAMODB_TABLE } = process.env;

export async function sqsHandler(event: SQSEvent) {
  const { id, content } = JSON.parse(event.Records[0].body);

  if (!id || !content) {
    return badRequestResponse('Missing parameters in message body.');
  }

  try {
    const dynamodb = getDynamoDB();

    await dynamodb
      .put({
        TableName: DYNAMODB_TABLE,
        Item: {
          id,
          content: `${content} (sqs)`,
        },
      })
      .promise();

    return successResponse({
      message: 'SQS Message processed.',
    });
  } catch (error) {
    return internalErrorResponse(error.message);
  }
}
