import AuthService from "../../../APPLICATION/interfaces/services/AuthService.js";
import admin from "../../firebaseConnection.js";

export default class FirebaseAuthService extends AuthService {
  async login(token) {
    try {
      const decoded = await admin.auth().verifyIdToken(token);
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
      const decoded = await admin.auth().verifyIdToken(token);
      return {
        id: decoded.uid,
        email: decoded.email,
        verifiedEmail: decoded.email_verified,
      };
    } catch (error) {
      if (error) {
        const error = new Error("Invalid or expired token");
        error.type = "InvalidTokenError";
        throw error;
      }
    }
  }

  async getUser(id) {
    try {
      const user = await admin.auth().getUser(id);
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
      const user = await admin.auth().deleteUser(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      return userRecord;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return null;
      } else {
        console.log("here2");
        throw error;
      }
    }
  }
}
