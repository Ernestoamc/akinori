const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
