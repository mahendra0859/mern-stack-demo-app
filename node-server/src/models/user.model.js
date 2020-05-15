const mongoose = require("mongoose");

module.exports = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      last_logged: { type: Date, default: Date.now() },
    },
    { timestamps: true }
  )
);
