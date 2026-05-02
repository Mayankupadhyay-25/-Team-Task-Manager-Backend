const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// ✅ 1. FIRST → Manual CORS (TOP पर)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // 🔥 preflight fix
  }

  next();
});


// ✅ 2. THEN → cors middleware (simple)
app.use(cors({
  origin: true,
  credentials: true
}));


// ✅ 3. THEN → body parser
app.use(express.json());


// ✅ 4. THEN → routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));


// test route
app.get("/", (req, res) => {
  res.send("API Running");
});


// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));


module.exports = app;


// run server
if (require.main === module) {
  app.listen(5000, () => console.log("Server running on port 5000"));
}