// Handle __dirname in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

import path from "path";
import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authenticateWebSocket from "./middlewares/websocketAuth.js";

import authApi from "./routes/authApi.js";
import cartApi from "./routes/cartApi.js";
import consumerApi from "./routes/consumerApi.js";
import deliverypersonApi from "./routes/deliverypersonApi.js";
import notificationApi from "./routes/notificationApi.js";
import orderApi from "./routes/orderApi.js";
import paymentApi from "./routes/paymentApi.js";
import productApi from "./routes/productApi.js";
import profileApi from "./routes/profileApi.js";
import userApi from "./routes/userApi.js";
import vendorApi from "./routes/vendorApi.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

import "./dbConnection.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/uploads", express.static("./uploads"));

app.use("", authApi);
app.use("", cartApi);
app.use("", consumerApi);
app.use("", deliverypersonApi);
app.use("", notificationApi);
app.use("", orderApi);
app.use("", paymentApi);
app.use("", productApi);
app.use("", profileApi);
app.use("", userApi);
app.use("", vendorApi);

app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server);

import registerOrderSocket from "./websockets/orderSocket.js";

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
