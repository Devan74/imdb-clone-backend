const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date },
  bio: { type: String },
});

module.exports = mongoose.model("Actor", actorSchema);