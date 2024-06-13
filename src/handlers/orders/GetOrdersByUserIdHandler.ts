import {APIGatewayProxyHandler} from 'aws-lambda';
import {OrderService} from '../../services/OrderService';
import logger from '../../utils/logger';
import {createErrorResponse, createSuccessResponse} from '../../utils/response';

export const handler: APIGatewayProxyHandler = async (event) => {
  logger.info(`GetOrdersByUserIdHandler - handler - Start`);

  try {
    logger.info(
      `GetOrdersByUserIdHandler - handler - Received event: ${JSON.stringify(
        event
      )}`
    );

    const {userId} = event.pathParameters || {};
    const {limit, orderId, createdDate} = event.queryStringParameters || {};

    if (!userId) {
      logger.error(
        `GetOrdersByUserIdHandler - handler - Error: Missing userId`
      );
      return createErrorResponse('Missing userId', 400);
    }

    const lastKey =
      orderId && createdDate ? {userId, orderId, createdDate} : undefined;

    const orderService = new OrderService();
    const result = await orderService.getOrdersByUserId(
      userId,
      limit ? parseInt(limit) : undefined,
      lastKey
    );

    logger.info(
      `GetOrdersByUserIdHandler - handler - Orders retrieved successfully for userId: ${userId}`
    );
    return createSuccessResponse('Orders retrieved successfully.', result, 200);
  } catch (error) {
    logger.error(`GetOrdersByUserIdHandler - handler - Error: ${error}`);
    return createErrorResponse(error, 500);
  } finally {
    logger.info(`GetOrdersByUserIdHandler - handler - End`);
  }
};
