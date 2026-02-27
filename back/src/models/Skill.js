const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      validate: {
        validator: Number.isInteger,
        message: 'Level must be an integer.',
      },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
