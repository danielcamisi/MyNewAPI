const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  nameProject: { type: String, required: true, trim: true },
  WhoSendFeedback: { type: String, required: false, trim: true },
  desc: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
