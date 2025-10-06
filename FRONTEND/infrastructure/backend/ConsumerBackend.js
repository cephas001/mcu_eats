export default class AuthBackend {
  constructor(api) {
    this.api = api;
  }

  // Create a new consumer
  async createConsumer(consumerProfileData) {
    try {
      return await this.api.request("/consumers", {
        method: "POST",
        body: { consumerProfileData },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get consumer by ID
  async getConsumerById(id) {
    try {
      return await this.api.request(`/consumers/${id}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a consumer
  async deleteConsumer(id) {
    try {
      return await this.api.request(`/consumers/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }

  // Update consumer details
  async updateConsumer(id, updates) {
    try {
      return await this.api.request(`/consumers/${id}`, {
        method: "PATCH",
        body: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all orders for a consumer
  async getConsumerOrders(id) {
    try {
      return await this.api.request(`/consumers/${id}/orders`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Add a favorite item/vendor for a consumer
  async createFavorite(id, { itemId, vendorId }) {
    try {
      return await this.api.request(`/consumers/${id}/favorites`, {
        method: "POST",
        body: { itemId, vendorId },
      });
    } catch (error) {
      throw error;
    }
  }

  // Remove a favorite item/vendor
  async removeFavorite(id, { itemId, vendorId }) {
    try {
      return await this.api.request(`/consumers/${id}/favorites`, {
        method: "DELETE",
        body: { itemId, vendorId },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all favorites for a consumer
  async getFavorites(id) {
    try {
      return await this.api.request(`/consumers/${id}/favorites`, {
        method: "GET",
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

  // Rate a vendor
  async rateVendor(vendorId, { rating, comment }) {
    try {
      return await this.api.request(`/vendors/${vendorId}/rate`, {
        method: "POST",
        body: { rating, comment },
      });
    } catch (error) {
      throw error;
    }
  }
}
