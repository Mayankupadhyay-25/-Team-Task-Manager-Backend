const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "https://team-task-manager-frontend-mu.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

module.exports = app;

if (require.main === module) {
  app.listen(5000, () => console.log("Server running on port 5000"));
}