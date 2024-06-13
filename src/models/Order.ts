export interface Order {
  orderId: string;
  userId: string;
  locationName: string;
  createdDate: string;
  status: string;
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
}
