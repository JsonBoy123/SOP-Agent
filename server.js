const express = require("express");
<<<<<<< HEAD
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/signupDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
=======
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// ROUTE IMPORT
app.use("/api/auth", require("./routes/authRoutes"));


app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));
>>>>>>> 98a2576910421f6ba795443e04249d0607aca6f3
