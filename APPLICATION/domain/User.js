class User {
  constructor({
    id,
    name,
    username,
    type,
    phoneNumber,
    email,
    role = "user",
    profiles = [],
    status = "active",
    createdAt = new Date(),
    updatedAt = new Date(),
    lastLogin = null,
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.type = type;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.role = role;
    this.profiles = profiles;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLogin = lastLogin;
  }
}

module.exports = User;
