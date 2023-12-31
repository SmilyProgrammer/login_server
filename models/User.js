const mongoose = require("mongoose");

// UserSchema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: String,
  varified: Boolean,
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
