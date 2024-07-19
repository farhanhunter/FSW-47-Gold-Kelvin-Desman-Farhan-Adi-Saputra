import express from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import { Server as SocketIo } from "socket.io";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import attendanceRoutes from "./routes/attendanceRoutes.mjs";
import presensiRoutes from "./routes/presensiRoutes.mjs";
import reasonRoutes from "./routes/reasonRoutes.mjs";
import errorRoutes from "./routes/errorRoutes.mjs";

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);
const port = 3001;

app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(
  "/node_modules",
  express.static(path.join(process.cwd(), "node_modules"))
);
app.use(expressLayouts);

app.use(methodOverride("_method"));
app.use("/attendances", attendanceRoutes); // Route untuk attendances
app.use("/presensi", presensiRoutes); // Route untuk presensi
app.use("/reasons", reasonRoutes); // Route untuk reasons
app.use(errorRoutes);

io.on("connection", (socket) => {
  console.log(`socket:${socket.id} connected`);
  socket.emit("foo", "bar");
  socket.on("foobar", () => {});
  socket.on("disconnect", (reason) => {
    console.log(`socket:${socket.id} disconnected due to: ${reason}`);
  });
});

app.set("io", io);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Log detail untuk setiap request yang masuk
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  next();
});
