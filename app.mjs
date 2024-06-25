// app.mjs
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import { Server as socketIo } from "socket.io";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import presensiRoutes from "./routes/presensiRoutes.mjs";
import portofolioRoutes from "./routes/portofolioRoutes.mjs";
import errorRoutes from "./routes/errorRoutes.mjs";

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);
const port = 3001;

app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(
  "/node_modules",
  express.static(path.join(process.cwd(), "node_modules"))
);
app.use(expressLayouts);

app.use("/", presensiRoutes);
app.use("/portofolio", portofolioRoutes);

app.use(errorRoutes); // Add error routes as the last middleware

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("io", io);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
