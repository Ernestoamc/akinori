const asyncHandler = require('../utils/asyncHandler');
const Profile = require('../models/Profile');

const toSafeFileName = (value = 'CV') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'CV';

const toAttachmentUrl = (url = '', fallbackName = 'CV') => {
  if (!url) return '';

  const safeName = `${toSafeFileName(fallbackName)}-CV`;

  try {
    const parsed = new URL(url);
    const isCloudinary = parsed.hostname.includes('res.cloudinary.com');

    if (!isCloudinary) {
      return url;
    }

    parsed.pathname = parsed.pathname.replace('/upload/', '/upload/fl_attachment/');

    if (!parsed.searchParams.has('filename')) {
      parsed.searchParams.set('filename', `${safeName}.pdf`);
    }

    return parsed.toString();
  } catch {
    return url;
  }
};

const buildProfileResponse = (profile) => ({
  name: profile.name || '',
  title: profile.title || '',
  logoName: profile.logoName || '',
  heroSubtitle: profile.heroSubtitle || '',
  heroTitlePrimary: profile.heroTitlePrimary || '',
  heroTitleSecondary: profile.heroTitleSecondary || '',
  about: profile.about || '',
  phone: profile.phone || '',
  email: profile.email || '',
  address: profile.address || '',
  portraitUrl: profile.portraitUrl || '',
  formalUrl: profile.formalUrl || '',
  cvUrl: profile.cvUrl || '',
  socials: {
    linkedin: profile.socials?.linkedin || '',
    instagram: profile.socials?.instagram || '',
    behance: profile.socials?.behance || '',
  },
  id: profile._id?.toString(),
});

const buildProfileUpdate = (data, existingSocials = {}) => {
  const update = {};

  if (data.name !== undefined) update.name = data.name;
  if (data.title !== undefined) update.title = data.title;
  if (data.logoName !== undefined) update.logoName = data.logoName;
  if (data.heroSubtitle !== undefined) update.heroSubtitle = data.heroSubtitle;
  if (data.heroTitlePrimary !== undefined) update.heroTitlePrimary = data.heroTitlePrimary;
  if (data.heroTitleSecondary !== undefined) update.heroTitleSecondary = data.heroTitleSecondary;
  if (data.about !== undefined) update.about = data.about;
  if (data.phone !== undefined) update.phone = data.phone;
  if (data.email !== undefined) update.email = data.email;
  if (data.address !== undefined) update.address = data.address;
  if (data.portraitUrl !== undefined) update.portraitUrl = data.portraitUrl;
  if (data.formalUrl !== undefined) update.formalUrl = data.formalUrl;
  if (data.cvUrl !== undefined) update.cvUrl = data.cvUrl;

  if (data.socials !== undefined) {
    update.socials = {
      ...existingSocials,
      ...(data.socials || {}),
    };
  }

  return update;
};

const getProfile = asyncHandler(async (_req, res) => {
  let profile = await Profile.findOne({ isSingleton: true }).lean();

  if (!profile) {
    const newProfile = await Profile.create({ isSingleton: true });
    profile = newProfile.toObject();
  }

  res.status(200).json({
    ok: true,
    data: buildProfileResponse(profile),
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({ isSingleton: true });

  if (!profile) {
    const newProfile = buildProfileUpdate(req.body);
    profile = await Profile.create({ isSingleton: true, ...newProfile });
  } else {
    const updatedProfile = buildProfileUpdate(req.body, profile.socials?.toObject?.() || profile.socials || {});
    Object.assign(profile, updatedProfile);
    await profile.save();
  }

  const profileObj = profile.toObject();

  res.status(200).json({
    ok: true,
    message: 'Perfil actualizado correctamente.',
    data: buildProfileResponse(profileObj),
  });
});

const downloadCv = asyncHandler(async (_req, res) => {
  const profile = await Profile.findOne({ isSingleton: true }).lean();
  const cvUrl = profile?.cvUrl;

  if (!cvUrl) {
    return res.status(404).json({
      ok: false,
      message: 'No hay CV disponible para descargar.',
    });
  }

  const attachmentUrl = toAttachmentUrl(cvUrl, profile?.name || 'CV');

  res.redirect(302, attachmentUrl);
});

module.exports = {
  getProfile,
  updateProfile,
  downloadCv,
};
