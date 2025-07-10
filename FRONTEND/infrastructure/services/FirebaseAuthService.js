import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthService from "../../../APPLICATION/interfaces/services/AuthService.js";

export default class FirebaseAuthService extends AuthService {
  constructor(auth, backendService) {
    super();
    this.auth = auth;
    this.backendService = backendService;
  }

  async signUp({ email, password }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const user = userCredential.user;

      return {
        user: user,
        id: user.uid,
        token: user.accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.backendService.getUserByEmail(email);
      if (user) {
        return user;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async loginWithEmailAndPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return userCredential.user.accessToken;
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        error.type = "InvalidCredentialsError";
        throw error;
      }
      throw error;
    }
  }
}
