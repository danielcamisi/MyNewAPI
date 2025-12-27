const feed = require('../models/feedbackSchema');

// Criar novo feedback
exports.create = async (req, res, next) => {
  try {
    const newFeedback = new feed(req.body);
    await newFeedback.save();
    res.status(201).json(newFeedback);
    console.log(newFeedback);
  } catch (error) {
    next(error);
  }
};