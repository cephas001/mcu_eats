export default function verifyUser(loginService) {
  return async function (token) {
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    try {
      const { id, email, verifiedEmail } = await loginService.verifyToken(
        token
      );

      return { id, email, verifiedEmail };
    } catch (error) {
      throw error;
    }
  };
}
