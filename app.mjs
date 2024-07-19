// app.mjs
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import { Server as SocketIo } from "socket.io";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session"; // Import express-session
import presensiRoutes from "./routes/presensiRoutes.mjs";
import reasonRoutes from "./routes/reasonRoutes.mjs";
import errorRoutes from "./routes/errorRoutes.mjs";

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);
const port = 3001;

// Use Morgan for logging HTTP requests
app.use(morgan("combined"));

// Middleware for handling form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: "your_secret_key", // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Ubah menjadi true jika menggunakan HTTPS
  })
);

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Setup static files
app.use(express.static(path.join(process.cwd(), "public")));
app.use(
  "/node_modules",
  express.static(path.join(process.cwd(), "node_modules"))
);

// Use express-ejs-layouts
app.use(expressLayouts);

// Routes
app.use(methodOverride("_method"));
app.use("/", presensiRoutes);
app.use("/reasons", reasonRoutes);

// Middleware for handling 404 errors using custom error view
app.use(errorRoutes);

// Connect Socket.IO
io.on("connection", (socket) => {
  console.log(`socket:${socket.id} connected`);

  // send an event to the client
  socket.emit("foo", "bar");

  socket.on("foobar", () => {
    // an event was received from the client
  });
  socket.on("disconnect", (reason) => {
    console.log(`socket:${socket.id} disconnected due to: ${reason}`);
  });
});

// Attach io to app
app.set("io", io);

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
