import {APIGatewayProxyHandler} from 'aws-lambda';
import {OrderService} from '../../services/OrderService';
import {getRequestBody} from '../../utils/getRequestBody';
import logger from '../../utils/logger';
import {createSuccessResponse} from '../../utils/response';
import {createErrorResponse} from './../../utils/response';

export const handler: APIGatewayProxyHandler = async (event) => {
  logger.info(`CreateOrderHandler - handler - Start`);

  try {
    logger.info(
      `CreateOrderHandler - handler - Received event: ${JSON.stringify(event)}`
    );

    const body = getRequestBody(event);
    logger.info(
      `CreateOrderHandler - handler - Parsed body: ${JSON.stringify(body)}`
    );

    const orderService = new OrderService();
    const newOrder = await orderService.createOrder(body);
    logger.info(
      `CreateOrderHandler - handler - Order created successfully: ${newOrder.orderId}`
    );

    return createSuccessResponse('Order created successfully.', newOrder, 201);
  } catch (error) {
    logger.error(`CreateOrderHandler - handler - Error: ${error}`);
    return createErrorResponse(error, 500);
  } finally {
    logger.info(`CreateOrderHandler - handler - End`);
  }
};
