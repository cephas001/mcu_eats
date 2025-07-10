const registerOrderSocket = (socket) => {
  socket.on("message", (message) => {
    console.log(message);
  });
};

export default registerOrderSocket;
