const mongoose = require("mongoose");

// UserSchema
const UserVerficationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: String,
});

const UserVerfication = new mongoose.model(
  "UserVerfication",
  UserVerficationSchema
);

module.exports = UserVerfication;
