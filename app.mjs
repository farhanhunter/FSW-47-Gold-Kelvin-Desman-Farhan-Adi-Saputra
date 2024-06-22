import express from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import { Server as socketIo } from "socket.io";
import expressLayouts from "express-ejs-layouts";
import presensiController from "./controllers/presensiController.mjs";
import provinsiController from "./controllers/provinsiController.mjs";

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);
const port = 3001;
// const provinsiController = new ProvinsiController();

// Middleware for handling form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(expressLayouts);

// Setup static files
app.use(express.static(path.join(process.cwd(), "public")));
app.use(
  "/node_modules",
  express.static(path.join(process.cwd(), "node_modules"))
);

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
    res.redirect("/");
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
