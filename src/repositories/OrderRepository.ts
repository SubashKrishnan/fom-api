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

  async getOrderById(orderId: string): Promise<Order | null> {
    logger.info(`OrderRepository - getOrderById - Start: orderId=${orderId}`);

    const params = {
      TableName,
      Key: {orderId},
    };

    try {
      const result = await dynamoDbClient.get(params).promise();
      const order = result.Item as Order;

      if (order) {
        logger.info(
          `OrderRepository - getOrderById - Order retrieved: ${JSON.stringify(
            order
          )}`
        );
      } else {
        logger.info(
          `OrderRepository - getOrderById - Order not found: orderId=${orderId}`
        );
      }

      return order;
    } catch (error) {
      logger.error(
        `OrderRepository - getOrderById - Error: orderId=${orderId} - ${error}`
      );
      throw new Error(`Failed to retrieve order: ${error}`);
    } finally {
      logger.info(`OrderRepository - getOrderById - End: orderId=${orderId}`);
    }
  }

  async getOrdersByUserId(
    userId: string,
    limit?: number,
    lastKey?: any
  ): Promise<any> {
    logger.info(
      `OrderRepository - getOrdersByUserId - Start: userId=${userId}, limit=${limit}, lastKey=${JSON.stringify(
        lastKey
      )}`
    );

    const params: any = {
      TableName,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      Limit: limit,
    };

    if (lastKey) {
      params.ExclusiveStartKey = lastKey;
    }

    try {
      const result = await dynamoDbClient.query(params).promise();
      logger.info(
        `OrderRepository - getOrdersByUserId - Orders retrieved: ${JSON.stringify(
          result.Items
        )}`
      );
      return {
        items: result.Items,
        lastKey: result.LastEvaluatedKey,
      };
    } catch (error) {
      logger.error(
        `OrderRepository - getOrdersByUserId - Error: userId=${userId} - ${error}`
      );
      throw new Error(`Failed to retrieve orders: ${error}`);
    } finally {
      logger.info(
        `OrderRepository - getOrdersByUserId - End: userId=${userId}`
      );
    }
  }
}
