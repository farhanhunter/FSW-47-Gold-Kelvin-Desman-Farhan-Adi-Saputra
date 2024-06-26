import express from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import { Server as socketIo } from "socket.io";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import presensiRoutes from "./routes/presensiRoutes.mjs";
import portofolioRoutes from "./routes/portofolioRoutes.mjs"; // Updated to portofolio routes
import errorRoutes from "./routes/errorRoutes.mjs"; // Import error routes

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);
const port = 3001;

// Use Morgan for logging HTTP requests
app.use(morgan("combined"));

// Middleware for handling form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

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
app.use("/", presensiRoutes);
app.use("/portofolio", portofolioRoutes); // Updated to portofolio routes

// Middleware for handling 404 errors using custom error view
app.use(errorRoutes); // Add error routes as the last middleware

// Connect Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Attach io to app
app.set("io", io);

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
