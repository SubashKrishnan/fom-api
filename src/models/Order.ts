export interface Order {
  orderId: string;
  userId: string;
  location: string;
  createdDate: string;
  status: string;
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
}
