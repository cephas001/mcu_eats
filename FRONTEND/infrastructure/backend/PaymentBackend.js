export default class PaymentBackend {
  constructor(api) {
    this.api = api;
  }

  // Initiate a payment
  async initiatePayment({ userId, amount, method, currency }) {
    try {
      return await this.api.request("/payments/initiate", {
        method: "POST",
        body: { userId, amount, method, currency },
      });
    } catch (error) {
      throw error;
    }
  }

  // Verify a payment
  async verifyPayment(paymentId, verificationCode) {
    try {
      return await this.api.request(`/payments/${paymentId}/verify`, {
        method: "POST",
        body: { verificationCode },
      });
    } catch (error) {
      throw error;
    }
  }

  // Save a payment method for a user
  async savePaymentMethod(userId, { methodType, details }) {
    try {
      return await this.api.request(`/users/${userId}/payment-methods`, {
        method: "POST",
        body: { methodType, details },
      });
    } catch (error) {
      throw error;
    }
  }

  // Remove a saved payment method
  async removePaymentMethod(userId, methodId) {
    try {
      return await this.api.request(
        `/users/${userId}/payment-methods/${methodId}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // Validate a payment method
  async validatePaymentMethod(methodId, validationData) {
    try {
      return await this.api.request(`/payment-methods/${methodId}/validate`, {
        method: "POST",
        body: { validationData },
      });
    } catch (error) {
      throw error;
    }
  }

  // Issue a refund for a payment
  async issueRefund(paymentId, { reason, amount }) {
    try {
      return await this.api.request(`/payments/${paymentId}/refund`, {
        method: "POST",
        body: { reason, amount },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get payment history for a user
  async getPaymentHistory(userId) {
    try {
      return await this.api.request(`/users/${userId}/payments`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get refund history for a user
  async getRefundHistory(userId) {
    try {
      return await this.api.request(`/users/${userId}/refunds`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }
}
