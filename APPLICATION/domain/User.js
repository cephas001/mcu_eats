export default class User {
  constructor({
    id,
    name,
    email,
    phoneNumber,
    verifiedEmail = false,
    role = "user", // 'user' | 'admin' | 'superadmin'
    category = "student", // 'staff' | 'student' | 'visitor'
    profiles = [],
    status = "active", // 'active' | 'inactive' | 'banned'
    createdAt = new Date(),
    updatedAt = new Date(),
    lastLogin = null,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.verifiedEmail = verifiedEmail;
    this.role = role;
    this.category = category;
    this.profiles = profiles;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLogin = lastLogin;
  }
}
