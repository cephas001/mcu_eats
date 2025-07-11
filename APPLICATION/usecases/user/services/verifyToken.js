import { InvalidTokenError } from "../../../domain/Error.js";

export default function verifyToken(loginService) {
  return async function (token) {
    if (!token) {
      throw new InvalidTokenError("Unauthorized: No token provided");
    }

    try {
      const { id, email, verifiedEmail } = await loginService.verifyToken(
        token
      );

      return { id, email, verifiedEmail };
    } catch (error) {
      throw new InvalidTokenError("Invalid or expired token");
    }
  };
}
