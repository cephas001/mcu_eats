export default class AuthBackend {
  constructor(api) {
    this.api = api;
  }

  // Authenticate user with full login flow
  async login(token) {
    try {
      return await this.api.request("/auth/login", {
        method: "POST",
        body: token ? { auth_token: token } : {},
      });
    } catch (error) {
      throw error;
    }
  }

  // Verify authentication token (e.g. JWT)
  async verifyToken(token) {
    try {
      return await this.api.request("/auth/verify-token", {
        method: "POST",
        body: token ? { auth_token: token } : {},
      });
    } catch (error) {
      throw error;
    }
  }

  // Retrieve user by email (secure lookup)
  async getUserByEmail(email) {
    try {
      return await this.api.request("/auth/users/lookup-by-email", {
        method: "POST",
        body: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  // Confirm user's email address
  async confirmEmail(email) {
    try {
      return await this.api.request("/auth/confirm-email", {
        method: "POST",
        body: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  // Refresh authentication token
  async refreshToken(refreshToken) {
    try {
      return await this.api.request("/auth/refresh-token", {
        method: "POST",
        body: refreshToken ? { refreshToken } : {},
      });
    } catch (error) {
      throw error;
    }
  }

  // Resend email confirmation
  async resendConfirmationEmail(email) {
    try {
      return await this.api.request("/auth/resend-confirmation-email", {
        method: "POST",
        body: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  // Send password reset link
  async sendPasswordResetLink(email) {
    try {
      return await this.api.request("/auth/send-password-reset-link", {
        method: "POST",
        body: { email },
      });
    } catch (error) {
      throw error;
    }
  }
}
