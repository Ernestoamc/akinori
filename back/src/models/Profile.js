const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: '' },
    title: { type: String, required: true, default: '' },
    logoName: { type: String, required: true, default: '' },
    heroSubtitle: { type: String, default: '' },
    heroTitlePrimary: { type: String, required: true, default: '' },
    heroTitleSecondary: { type: String, required: true, default: '' },
    about: { type: String, required: true, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, required: true, default: '' },
    address: { type: String, default: '' },
    portraitUrl: { type: String, default: '' },
    formalUrl: { type: String, default: '' },
    cvUrl: { type: String, default: '' },
    socials: {
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      behance: { type: String, default: '' },
    },
    isSingleton: { type: Boolean, default: true, immutable: true },
  },
  { timestamps: true },
);

profileSchema.index({ isSingleton: 1 }, { unique: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
