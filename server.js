const express = require("express");
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
