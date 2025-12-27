const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  pword: { type: String, required: true}
});

const User = mongoose.model('user-my-api', userSchema);

module.exports = User;
