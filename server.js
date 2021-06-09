const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  //When a user connects to server we get users public key and id and we creating an record for user

  console.log(socket.id, "Connected");

  socket.broadcast.emit("keyBroadcast", socket.handshake.query["publicKey"]);

  socket.once("disconnect", function () {
    console.log(socket.id, "Disconnected");
  });

  socket.on("message", (message,id) => {
    socket.broadcast.emit("messageFromSocket", [id, message]);
  });
  socket.on("keyBroadcastFromFirstUser", (key) => {
    socket.broadcast.emit("keyBroadcastFromFirstUsersSocket", key);
  });
});

httpServer.listen(3001);
