const admin = require("../firebaseConnection");

const verifyToken = async (req, res, next) => {
  const token =
    req.cookies.auth_token || req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.json({ token: false, error: "Unauthorized: No token provided" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.json({ validToken: false, error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
