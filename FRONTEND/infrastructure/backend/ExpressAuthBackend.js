import AuthBackend from "../../../APPLICATION/interfaces/backend/AuthBackend.js";

export default class ExpressAuthBackend extends AuthBackend {
  constructor(api) {
    super();
    this.api = api;
  }

  async verifyToken(token) {
    try {
      return await this.api.request("/verifyToken", {
        method: "POST",
        body: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async login(token) {
    try {
      return await this.api.request("/login", {
        method: "POST",
        body: { token },
      });
    } catch (error) {
      throw error;
    }
  }
}
