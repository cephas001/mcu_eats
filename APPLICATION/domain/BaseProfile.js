export default class BaseProfile {
  constructor({
    id,
    userId,
    type,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
  }
}
