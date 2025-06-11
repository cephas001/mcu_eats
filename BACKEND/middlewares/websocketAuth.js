const admin = require("../firebaseConnection");

module.exports = async function authenticateWebSocket(
  request,
  socket,
  head,
  callback
) {
  const token = request.headers["sec-websocket-protocol"];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    request.user = decodedToken; // Attach user data to request
    callback(null, request);
  } catch (error) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  }
};
