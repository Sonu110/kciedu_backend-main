const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    jobName: String,
    description: String,
    experience: String,
    salary: String,
    imageUrl: String,
  });
  
  const Placement = mongoose.model('Placement', placementSchema);
  module.exports = Placement