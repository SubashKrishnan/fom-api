import {Order} from '../models/Order';
import dynamoDbClient from '../utils/DynamoDbClient';
import logger from '../utils/logger';

const TableName = process.env.DYNAMODB_ORDERS || 'Orders';

export class OrderRepository {
  async createOrder(order: Order): Promise<void> {
    logger.info(
      `OrderRepository - createOrder - Start: orderId=${order.orderId}`
    );

    const params = {
      TableName,
      Item: order,
    };

    try {
      await dynamoDbClient.put(params).promise();
      logger.info(
        `OrderRepository - createOrder - Success: orderId=${order.orderId}`
      );
    } catch (error) {
      logger.error(
        `OrderRepository - createOrder - Error: orderId=${order.orderId} - ${error}`
      );
      throw new Error(`Failed to create order: ${error}`);
    } finally {
      logger.info(
        `OrderRepository - createOrder - End: orderId=${order.orderId}`
      );
    }
  }
}
