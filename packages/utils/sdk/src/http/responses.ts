import { LambdaResponse } from './types';

const defaultHeaders = {
  'content-type': 'application/json',
}

export function response(statusCode: number, body: object, headers = {}): LambdaResponse {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: JSON.stringify(body),
  };
}

export function internalErrorResponse(message = 'Internal Server Error'): LambdaResponse {
  return response(500, { message });
}

export function badRequestResponse(message = 'Bad Request'): LambdaResponse {
  return response(400, { message });
}

export function successResponse(body: object): LambdaResponse {
  return response(200, body);
}
