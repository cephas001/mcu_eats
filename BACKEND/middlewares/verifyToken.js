import { createVerifyTokenUseCase } from "../services/index.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.auth_token || req.headers?.authorization?.split(" ")[1];
    const user = await createVerifyTokenUseCase(token);
    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
};

export default verifyToken;
