const express = require("express");
const sequelize = require("./config/database");
const studentRoutes = require("./routes/studentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const app = express();
const port = 3000;

// const indexRoutes = require("./routes/index");

// app.use("/", indexRoutes);

// why it needs json()?
app.use(express.json());
app.use("/api", studentRoutes);

// Use the subject routes under the /api prefix
app.use("/api", subjectRoutes);

// Sync Database and Start Server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
  });
});
