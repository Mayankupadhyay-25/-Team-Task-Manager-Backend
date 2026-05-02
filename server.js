const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin || 
      origin.includes("vercel.app") ||  // ✅ ALL vercel frontend allow
      origin === "http://localhost:3000"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors({
  origin: true,
  credentials: true
}));
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


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specific domain
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ important for preflight
  }

  next();
});