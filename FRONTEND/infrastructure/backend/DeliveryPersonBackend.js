export default class DeliveryPersonBackend {
  constructor(api) {
    this.api = api;
  }

  // Create a new delivery person
  async createDeliveryPerson({ name, phone, area }) {
    try {
      return await this.api.request("/delivery-persons", {
        method: "POST",
        body: { name, phone, area },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get delivery person by ID
  async getDeliveryPersonById(id) {
    try {
      return await this.api.request(`/delivery-persons/${id}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Update delivery person details
  async updateDeliveryPerson(id, updates) {
    try {
      return await this.api.request(`/delivery-persons/${id}`, {
        method: "PATCH",
        body: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a delivery person
  async deleteDeliveryPerson(id) {
    try {
      return await this.api.request(`/delivery-persons/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }

  // Assign a delivery to a delivery person
  async assignDelivery(deliveryId, deliveryPersonId) {
    try {
      return await this.api.request(`/deliveries/${deliveryId}/assign`, {
        method: "POST",
        body: { deliveryPersonId },
      });
    } catch (error) {
      throw error;
    }
  }

  // Accept a delivery assignment
  async acceptDelivery(deliveryId, deliveryPersonId) {
    try {
      return await this.api.request(`/deliveries/${deliveryId}/accept`, {
        method: "POST",
        body: { deliveryPersonId },
      });
    } catch (error) {
      throw error;
    }
  }

  // Decline a delivery assignment
  async declineDelivery(deliveryId, { deliveryPersonId, reason }) {
    try {
      return await this.api.request(`/deliveries/${deliveryId}/decline`, {
        method: "POST",
        body: { deliveryPersonId, reason },
      });
    } catch (error) {
      throw error;
    }
  }

  // Update delivery status
  async updateDeliveryStatus(deliveryId, status) {
    try {
      return await this.api.request(`/deliveries/${deliveryId}/status`, {
        method: "PATCH",
        body: { status },
      });
    } catch (error) {
      throw error;
    }
  }

  // Track a delivery
  async trackDelivery(deliveryId) {
    try {
      return await this.api.request(`/deliveries/${deliveryId}/track`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get delivery history for a delivery person
  async getDeliveryHistory(id) {
    try {
      return await this.api.request(`/delivery-persons/${id}/history`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get deliveries by area
  async getDeliveriesByArea(area) {
    try {
      return await this.api.request(`/deliveries/area/${area}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }
}
