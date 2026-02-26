const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
