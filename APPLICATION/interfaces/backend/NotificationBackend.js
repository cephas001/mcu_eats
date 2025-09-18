export default class NotificationBackend {
  /**
   * @param {Object} messageData
   * @returns {Promise<void>} Sends push notification
   */
  async sendPushNotification(messageData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} smsData
   * @returns {Promise<void>} Sends SMS
   */
  async sendSMS(smsData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} emailData
   * @returns {Promise<void>} Sends email
   */
  async sendEmail(emailData) {
    throw new Error("Method not implemented.");
  }
}
