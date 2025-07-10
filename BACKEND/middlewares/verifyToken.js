import { createVerifyUserUseCase } from "../services/index.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.auth_token || req.headers?.authorization?.split(" ")[1];
    const user = await createVerifyUserUseCase(token);
    req.user = user;
    next();
  } catch (error) {
    return res.json({ validToken: false, error: error.message });
  }
};

export default verifyToken;
