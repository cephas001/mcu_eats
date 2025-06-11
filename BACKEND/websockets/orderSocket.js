module.exports = (ws, request) => {
  ws.on("message", (message) => {
    console.log(message);
  });
};
