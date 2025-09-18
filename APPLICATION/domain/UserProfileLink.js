export default class UserProfileLink {
  constructor({
    profileId,
    type, // 'consumer' | 'delivery_person' | 'vendor'
  }) {
    this.profileId = profileId;
    this.type = type;
  }
}
