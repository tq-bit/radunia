const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  userMail: { type: String, required: true, unique: true },
  userRoles: { type: Array, required: true },
  userBio: { type: String, required: false },
  userBirthday: { type: Date, required: false },
  userPreferences: { type: Array, required: false },
  registered: { type: Date },
  lastLogin: { type: Date },
});

module.exports = mongoose.model('User', User);