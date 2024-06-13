import {APIGatewayProxyHandler} from 'aws-lambda';
import {OrderService} from '../../services/OrderService';
import logger from '../../utils/logger';
import {createErrorResponse, createSuccessResponse} from '../../utils/response';

export const handler: APIGatewayProxyHandler = async (event) => {
  logger.info(`GetOrderHandler - handler - Start`);

  try {
    logger.info(
      `GetOrderHandler - handler - Received event: ${JSON.stringify(event)}`
    );

    const {orderId} = event.pathParameters || {};

    if (!orderId) {
      logger.error(`GetOrderHandler - handler - Error: Missing orderId`);
      return createErrorResponse('Missing orderId', 400);
    }

    const orderService = new OrderService();
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      logger.info(`GetOrderHandler - handler - Order not found: ${orderId}`);
      return createErrorResponse(`Order not found: ${orderId}`, 404);
    }

    logger.info(
      `GetOrderHandler - handler - Order retrieved successfully: ${orderId}`
    );
    return createSuccessResponse('Order retrieved successfully.', order, 200);
  } catch (error) {
    logger.error(`GetOrderHandler - handler - Error: ${error}`);
    return createErrorResponse(error);
  } finally {
    logger.info(`GetOrderHandler - handler - End`);
  }
};
