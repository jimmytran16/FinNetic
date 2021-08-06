const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: false },
});

const User = mongoose.model('users', userSchema);

module.exports = User;