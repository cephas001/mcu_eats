require("dotenv").config({ path: "./config/config.env" });

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authenticateWebSocket = require("./middlewares/websocketAuth");

const app = express();

require("./dbConnection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/uploads", express.static("./uploads"));
app.use("", require("./routes/vendorApi"));
app.use("", require("./routes/userApi"));

const server = http.createServer(app);
const io = new Server(server);

const registerOrderSocket = require("./websockets/orderSocket");

// Authentication middleware
io.use((socket, next) => {
  // Example: get token from query or headers
  const token =
    socket.handshake.auth.token || socket.handshake.headers["authorization"];
  authenticateWebSocket(token, (err, user) => {
    if (err) return next(new Error("Authentication error"));
    socket.user = user; // Attach user info to socket
    next();
  });
});

io.on("connection", (socket) => {
  console.log("Client connected!");

  registerOrderSocket(socket);

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
