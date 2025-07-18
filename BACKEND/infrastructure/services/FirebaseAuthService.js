import AuthService from "../../../APPLICATION/interfaces/services/AuthService.js";

export default class FirebaseAuthService extends AuthService {
  constructor(admin) {
    super();
    this.admin = admin;
  }

  async login(token) {
    try {
      const decoded = await this.admin.auth().verifyIdToken(token);
      return {
        user: decoded,
        id: decoded.uid,
      };
    } catch (error) {
      if (error) {
        const error = new Error("Invalid or expired token");
        error.type = "InvalidTokenError";
        throw error;
      }
    }
  }

  async verifyToken(token) {
    try {
      const decoded = await this.admin.auth().verifyIdToken(token);
      return {
        id: decoded.uid,
        email: decoded.email,
        verifiedEmail: decoded.email_verified,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      const user = await this.admin.auth().getUser(id);
      return user;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return null;
      } else {
        throw error;
      }
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.admin.auth().deleteUser(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const userRecord = await this.admin.auth().getUserByEmail(email);
      return userRecord;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return null;
      } else {
        throw error;
      }
    }
  }
}
