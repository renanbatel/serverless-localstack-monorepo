import { APIGatewayProxyEvent } from "aws-lambda";

export async function apiGatewayHandler(event: APIGatewayProxyEvent) {
  return {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      function: 'createUser',
      method: 'post',
    }),
  };
}