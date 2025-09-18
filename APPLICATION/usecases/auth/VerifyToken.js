import { InvalidTokenError, TokenExistenceError } from "../../domain/Error.js";

export default function VerifyToken(authService) {
  return async function (token) {
    if (!token) {
      throw new TokenExistenceError("No token has been provided");
    }

    try {
      const { id, email, verifiedEmail } = await authService.verifyToken(token);

      return { id, email, verifiedEmail };
    } catch (error) {
      throw new InvalidTokenError("Invalid or expired token");
    }
  };
}
