const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

const io = socketIo(server);
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
    console.log(data);
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("3000");
});
