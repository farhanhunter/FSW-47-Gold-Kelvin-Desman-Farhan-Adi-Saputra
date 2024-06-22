const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const expressLayouts = require("express-ejs-layouts");
const presensiController = require("./controllers/presensiController");
const ProvinsiController = require("./controllers/provinsiController");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;
const provinsiController = new ProvinsiController();

// Middleware for handling form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Setup static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Routes for presensi
app.get("/", (req, res) => {
  presensiController.getPresensi(req, res);
});

app.get("/provinsi", (req, res) => {
  provinsiController.getProvinsi(req, res);
});

app.post("/", (req, res) => {
  presensiController.postPresensi(req, res, (newPresensi) => {
    io.emit("newPresensi", newPresensi);
    res.redirect("/presensi");
  });
});

app.post("/provinsi", (req, res) => {
  provinsiController.addProvinsi(req, res);
});

// Middleware for handling 404 errors
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Connect Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
