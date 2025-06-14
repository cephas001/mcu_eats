module.exports = (socket) => {
  socket.on("message", (message) => {
    console.log(message);
  });
};
