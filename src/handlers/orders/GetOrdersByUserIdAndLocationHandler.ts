import {APIGatewayProxyHandler} from 'aws-lambda';
import {OrderService} from '../../services/OrderService';
import logger from '../../utils/logger';
import {createErrorResponse, createSuccessResponse} from '../../utils/response';

export const handler: APIGatewayProxyHandler = async (event) => {
  logger.info(`GetOrdersByUserIdAndLocationHandler - handler - Start`);

  try {
    logger.info(
      `GetOrdersByUserIdAndLocationHandler - handler - Received event: ${JSON.stringify(
        event
      )}`
    );

    const {userId, locationName} = event.pathParameters || {};
    const {limit, orderId} = event.queryStringParameters || {};

    if (!userId || !locationName) {
      logger.error(
        `GetOrdersByUserIdAndLocationHandler - handler - Error: Missing userId or location`
      );
      return createErrorResponse('Missing userId or location', 400);
    }

    const lastKey =
      userId && locationName && orderId
        ? {userId, orderId, locationName}
        : undefined;

    const orderService = new OrderService();
    const result = await orderService.getOrdersByUserIdAndLocation(
      userId,
      locationName,
      limit ? parseInt(limit) : undefined,
      lastKey
    );

    logger.info(
      `GetOrdersByUserIdAndLocationHandler - handler - Orders retrieved successfully for userId: ${userId} and locationName: ${locationName}`
    );
    return createSuccessResponse('Orders retrieved successfully.', result, 200);
  } catch (error) {
    logger.error(
      `GetOrdersByUserIdAndLocationHandler - handler - Error: ${error}`
    );
    return createErrorResponse(error, 500);
  } finally {
    logger.info(`GetOrdersByUserIdAndLocationHandler - handler - End`);
  }
};
