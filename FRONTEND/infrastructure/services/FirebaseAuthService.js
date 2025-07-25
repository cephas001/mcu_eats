import AuthService from "../../../APPLICATION/interfaces/services/AuthService.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

export default class FirebaseAuthService extends AuthService {
  constructor(auth, backendService) {
    super();
    this.auth = auth;
    this.backendService = backendService;
  }

  async signUpUserWithEmailAndPassword({ email, password }) {
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

  async signUpUserWithProvider(provider) {
    try {
      var serviceProvider = null;
      if (provider == "google") {
        serviceProvider = new GoogleAuthProvider();
      }
      if (provider == "facebook") {
        serviceProvider = new FacebookAuthProvider();
      }
      if (!serviceProvider) {
        throw new Error("Unsupported provider");
      }
      const result = await signInWithPopup(this.auth, serviceProvider);
      const user = result.user;
      return { user, id: user.uid, token: user.accessToken };
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.backendService.getUserByEmail(email);
      return user;
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
