export default class OrderBackend {
  constructor(api) {
    this.api = api;
  }

  // Place a new order
  async placeOrder({ userId, items, deliveryAddress, paymentMethod }) {
    try {
      return await this.api.request("/orders", {
        method: "POST",
        body: { userId, items, deliveryAddress, paymentMethod },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      return await this.api.request(`/orders/${orderId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get order summary
  async getOrderSummary(orderId) {
    try {
      return await this.api.request(`/orders/${orderId}/summary`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get order timeline (status history)
  async getOrderTimeline(orderId) {
    try {
      return await this.api.request(`/orders/${orderId}/timeline`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all orders placed by a user
  async getOrdersByUser(userId) {
    try {
      return await this.api.request(`/users/${userId}/orders`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all orders received by a vendor
  async getOrdersByVendor(vendorId) {
    try {
      return await this.api.request(`/vendors/${vendorId}/orders`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // List orders by status
  async listOrdersByStatus(status) {
    try {
      return await this.api.request(`/orders/status/${status}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      return await this.api.request(`/orders/${orderId}/status`, {
        method: "PATCH",
        body: { status },
      });
    } catch (error) {
      throw error;
    }
  }

  // Mark order as complete
  async completeOrder(orderId) {
    try {
      return await this.api.request(`/orders/${orderId}/complete`, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  // Cancel an order
  async cancelOrder(orderId, reason) {
    try {
      return await this.api.request(`/orders/${orderId}/cancel`, {
        method: "POST",
        body: { reason },
      });
    } catch (error) {
      throw error;
    }
  }

  // Notify that order is ready
  async notifyOrderReady(orderId) {
    try {
      return await this.api.request(`/orders/${orderId}/notify-ready`, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  // Rate an order
  async rateOrder(orderId, { rating, comment }) {
    try {
      return await this.api.request(`/orders/${orderId}/rate`, {
        method: "POST",
        body: { rating, comment },
      });
    } catch (error) {
      throw error;
    }
  }

  // Refund an order
  async refundOrder(orderId, reason) {
    try {
      return await this.api.request(`/orders/${orderId}/refund`, {
        method: "POST",
        body: { reason },
      });
    } catch (error) {
      throw error;
    }
  }
}
