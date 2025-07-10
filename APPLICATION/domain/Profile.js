export default class Profile {
  constructor({
    id,
    type,
    userId,
    data,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.type = type; // 'consumer' | 'delivery_person' | 'vendor'
    this.userId = userId;
    this.data = data; // type-specific details
    this.createdAt = createdAt; // Date when the profile was created
    this.updatedAt = updatedAt; // Date when the profile was last updated
  }
}
