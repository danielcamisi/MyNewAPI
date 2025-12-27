
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectname: { type: String, required: true },
  desc: { type: String, required: true},
  url: { type: String, required: false },
  img: {type: String, required:true},
  technology: { type: String, required: false },
  secondTechnology: { type: String, required: false },
  thirdTechnology: { type: String, required: false },
  projectType: { type: String, required: true }
});

const projects = mongoose.model('projects', projectSchema);

module.exports = projects;
