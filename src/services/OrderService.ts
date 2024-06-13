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
}
