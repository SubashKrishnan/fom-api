import {v4 as uuidv4} from 'uuid';
import {Order} from '../models/Order';
import {OrderRepository} from '../repositories/OrderRepository';
import {orderSchema} from '../schemas/orderSchema';
import logger from '../utils/logger';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    logger.info(`OrderService - createOrder - Start`);

    try {
      const {error, value} = orderSchema.validate(orderData);
      if (error) {
        logger.error(
          `OrderService - createOrder - Validation Error: ${error.message}`
        );
        throw new Error(`Validation error: ${error.message}`);
      }

      const order: Order = {
        ...value,
        orderId: uuidv4(),
        createdDate: new Date().toISOString(),
      };

      logger.info(
        `OrderService - createOrder - Creating order: ${JSON.stringify(order)}`
      );
      await this.orderRepository.createOrder(order);
      logger.info(
        `OrderService - createOrder - Order created successfully: ${order.orderId}`
      );

      return order;
    } catch (error) {
      logger.error(`OrderService - createOrder - Error: ${error}`);
      throw new Error(`Failed to create order: ${error}`);
    } finally {
      logger.info(`OrderService - createOrder - End`);
    }
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    logger.info(`OrderService - getOrderById - Start: orderId=${orderId}`);

    try {
      const order = await this.orderRepository.getOrderById(orderId);

      if (!order) {
        logger.info(
          `OrderService - getOrderById - Order not found: ${orderId}`
        );
      } else {
        logger.info(
          `OrderService - getOrderById - Order retrieved successfully: ${orderId}`
        );
      }

      return order;
    } catch (error) {
      logger.error(`OrderService - getOrderById - Error: ${error}`);
      throw new Error(`Failed to retrieve order: ${error}`);
    } finally {
      logger.info(`OrderService - getOrderById - End: orderId=${orderId}`);
    }
  }

  async getOrdersByUserId(
    userId: string,
    limit?: number,
    lastKey?: any
  ): Promise<any> {
    logger.info(
      `OrderService - getOrdersByUserId - Start: userId=${userId}, limit=${limit}, lastKey=${JSON.stringify(
        lastKey
      )}`
    );

    try {
      const result = await this.orderRepository.getOrdersByUserId(
        userId,
        limit,
        lastKey
      );
      logger.info(
        `OrderService - getOrdersByUserId - Orders retrieved successfully for userId=${userId}`
      );
      return result;
    } catch (error) {
      logger.error(`OrderService - getOrdersByUserId - Error: ${error}`);
      throw new Error(`Failed to retrieve orders: ${error}`);
    } finally {
      logger.info(`OrderService - getOrdersByUserId - End: userId=${userId}`);
    }
  }

  async getOrdersByUserIdAndLocation(
    userId: string,
    locationName: string,
    limit?: number,
    lastKey?: any
  ): Promise<any> {
    logger.info(
      `OrderService - getOrdersByUserIdAndLocation - Start: userId=${userId}, locationName=${locationName}, limit=${limit}, lastKey=${JSON.stringify(
        lastKey
      )}`
    );

    try {
      const result = await this.orderRepository.getOrdersByUserIdAndLocation(
        userId,
        locationName,
        limit,
        lastKey
      );
      logger.info(
        `OrderService - getOrdersByUserIdAndLocation - Orders retrieved successfully for userId=${userId} and locationName=${locationName}`
      );
      return result;
    } catch (error) {
      logger.error(
        `OrderService - getOrdersByUserIdAndLocation - Error: ${error}`
      );
      throw new Error(`Failed to retrieve orders: ${error}`);
    } finally {
      logger.info(
        `OrderService - getOrdersByUserIdAndLocation - End: userId=${userId}, locationName=${locationName}`
      );
    }
  }
}
