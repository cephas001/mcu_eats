export default class Order {
  constructor({
    id,
    userId,
    vendorId,
    deliveryPersonId,
    items = [], // ARRAY OF ORDER ITEMS (CHECK DOMAIN)
    totalPrice,
    paymentStatus,
    orderStatus,
    deliveryAddress,
    deliveryFee,
    estimatedDeliveryTime,
    placedAt = new Date(),
    updatedAt,
  }) {
    this.id = id;
    this.userId = userId;
    this.vendorId = vendorId;
    this.deliveryPersonId = deliveryPersonId;
    this.items = items;
    this.totalPrice = totalPrice;
    this.paymentStatus = paymentStatus;
    this.orderStatus = orderStatus;
    this.deliveryAddress = deliveryAddress;
    this.deliveryFee = deliveryFee;
    this.estimatedDeliveryTime = estimatedDeliveryTime;
    this.placedAt = placedAt;
    this.updatedAt = updatedAt;
  }
}
