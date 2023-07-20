const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date },
  bio: { type: String },
});

module.exports = mongoose.model("Producer", producerSchema);