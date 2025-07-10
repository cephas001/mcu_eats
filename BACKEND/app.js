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

import vendorApi from "./routes/vendorApi.js";
import userApi from "./routes/userApi.js";
import profileApi from "./routes/profileApi.js";
import authApi from "./routes/authApi.js";

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

app.use("", vendorApi);
app.use("", userApi);
app.use("", profileApi);
app.use("", authApi);

app.use(errorHandler);

const serverPemPath = path.resolve(__dirname, "config", "server.pem");

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
