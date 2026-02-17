const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },

  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    default: 'Planning'
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
