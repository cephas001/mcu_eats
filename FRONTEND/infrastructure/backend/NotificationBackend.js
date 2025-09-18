export default class NotificationBackend {
  constructor(api) {
    this.api = api;
  }

  // Schedule a notification to be sent later
  async scheduleNotification({ recipientId, type, message, scheduledTime }) {
    try {
      return await this.api.request("/notifications/schedule", {
        method: "POST",
        body: { recipientId, type, message, scheduledTime },
      });
    } catch (error) {
      throw error;
    }
  }

  // Send an email notification immediately
  async sendEmailNotification({ to, subject, body }) {
    try {
      return await this.api.request("/notifications/email", {
        method: "POST",
        body: { to, subject, body },
      });
    } catch (error) {
      throw error;
    }
  }

  // Send a push notification
  async sendPushNotification({ deviceToken, title, message }) {
    try {
      return await this.api.request("/notifications/push", {
        method: "POST",
        body: { deviceToken, title, message },
      });
    } catch (error) {
      throw error;
    }
  }

  // Send an SMS notification
  async sendSMSNotification({ phoneNumber, message }) {
    try {
      return await this.api.request("/notifications/sms", {
        method: "POST",
        body: { phoneNumber, message },
      });
    } catch (error) {
      throw error;
    }
  }

  // Subscribe a user to a topic
  async subscribeToTopic({ userId, topic }) {
    try {
      return await this.api.request("/notifications/subscribe", {
        method: "POST",
        body: { userId, topic },
      });
    } catch (error) {
      throw error;
    }
  }

  // Unsubscribe a user from a topic
  async unsubscribeFromTopic({ userId, topic }) {
    try {
      return await this.api.request("/notifications/unsubscribe", {
        method: "POST",
        body: { userId, topic },
      });
    } catch (error) {
      throw error;
    }
  }
}
