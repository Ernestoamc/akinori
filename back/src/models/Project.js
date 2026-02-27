const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ['render', 'plan', 'detail', 'sketch'],
      default: 'render',
    },
    caption: { type: String, default: '' },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, required: true },
    tags: [{ type: String }],
    images: [imageSchema],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
