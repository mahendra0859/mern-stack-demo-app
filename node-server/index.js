const express = require("express"),
  app = express(),
  cors = require("cors"),
  mongoose = require("mongoose"),
  expressValidator = require("express-validator"),
  AuthRoutes = require("./src/routes/auth.route");

mongoose.connect(
  "mongodb://localhost:27017/mern-demo",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.error(err) : console.info("DB Connected"))
);

app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use("/v1", AuthRoutes);

app.listen(3001, () => console.info("Server is running on port number 3001"));
