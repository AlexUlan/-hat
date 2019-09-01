const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

server.listen(3000);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

connections = [];

io.sockets.on("connection", socket => {
  connections.push(socket);

  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
  });
  socket.on("send mess", ({ massage, name, alertClass }) => {
    io.sockets.emit("add mess", { massage, name, alertClass });
  });
});
