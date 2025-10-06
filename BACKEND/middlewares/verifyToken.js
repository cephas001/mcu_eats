import { VerifyTokenUseCase } from "../services/index.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.auth_token || req.headers?.authorization?.split(" ")[1];
    const { id, email, verifiedEmail } = await VerifyTokenUseCase(token);
    req.user = { id, email, verifiedEmail };
    next();
  } catch (error) {
    throw error;
  }
};

export default verifyToken;
