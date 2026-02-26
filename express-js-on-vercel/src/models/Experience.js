const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
