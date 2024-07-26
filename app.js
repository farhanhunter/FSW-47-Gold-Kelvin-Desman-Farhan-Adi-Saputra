const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Import routes
const companyRoutes = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");
const attendanceScheduleRoutes = require("./routes/attendanceScheduleRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userSessionRoutes = require("./routes/userSessionRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api", companyRoutes);
app.use("/api", userRoutes);
app.use("/api", attendanceScheduleRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", userSessionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
