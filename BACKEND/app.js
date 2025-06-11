require("dotenv").config({ path: "./config/config.env" });

const http = require("http");
const WebSocket = require("ws");
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

app.use("/uploads", express.static("./uploads"));
app.use("", require("./routes/vendorApi"));
app.use("", require("./routes/userApi"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

const registerOrderSocket = require("./websockets/orderSocket");

server.on("upgrade", (request, socket, head) => {
  authenticateWebSocket(request, socket, head, (err, authenticatedRequest) => {
    if (err) return;

    wss.handleUpgrade(authenticatedRequest, socket, head, (ws) => {
      wss.emit("connection", ws, authenticatedRequest);
    });
  });
});

wss.on("connection", (ws, request) => {
  console.log("Client connected!");

  registerOrderSocket(ws, request);

  ws.on("close", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
