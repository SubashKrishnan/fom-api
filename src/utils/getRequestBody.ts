import {APIGatewayProxyEvent} from 'aws-lambda';

export const getRequestBody = (event: APIGatewayProxyEvent): any => {
  if (!event.body) {
    throw new Error('Missing request body');
  }

  const bodyString = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body;
  return JSON.parse(bodyString);
};
