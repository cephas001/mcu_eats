import admin from "../firebaseConnection.js";

export default async function authenticateWebSocket(token, callback) {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    request.user = decodedToken; // Attach user data to request
    callback(null, request.user);
  } catch (error) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  }
}
