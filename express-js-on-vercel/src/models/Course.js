const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
