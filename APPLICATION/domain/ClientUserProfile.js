export default class ClientUserProfile {
  constructor({
    id,
    userId,
    type,
    profileData,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.userId = userId;
    this.profileData = profileData;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
  }
}
