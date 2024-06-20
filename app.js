const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const presensiController = require("./controllers/presensiController");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

// Middleware untuk meng-handle data form
app.use(bodyParser.urlencoded({ extended: true }));

// Setup static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Rute untuk mendapatkan presensi
app.get("/presensi", (req, res) => {
  presensiController.getPresensi(req, res);
});

// Rute untuk menambah presensi
app.post("/presensi", (req, res) => {
  presensiController.postPresensi(req, res, (newPresensi) => {
    io.emit("newPresensi", newPresensi);
    res.redirect("/presensi");
  });
});

// Middleware untuk menangani error 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Menghubungkan Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Menjalankan Server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
