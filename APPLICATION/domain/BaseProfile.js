export default class BaseProfile {
  constructor({ id, userId, createdAt = new Date(), updatedAt = new Date() }) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt; // Date when the profile was created
    this.updatedAt = updatedAt; // Date when the profile was last updated
  }
}
