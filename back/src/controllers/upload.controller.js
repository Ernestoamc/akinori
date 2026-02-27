const { v2: cloudinary } = require('cloudinary');
const configureCloudinary = require('../config/cloudinary');
const asyncHandler = require('../utils/asyncHandler');

const uploadFile = asyncHandler(async (req, res) => {
  const cloudinaryClient = configureCloudinary();

  if (!cloudinaryClient) {
    return res.status(500).json({
      ok: false,
      message: 'Cloudinary no está configurado correctamente.',
    });
  }

  if (!req.file) {
    return res.status(400).json({
      ok: false,
      message: 'No se proporcionó ningún archivo.',
    });
  }

  const isPdf = req.file.mimetype === 'application/pdf';

  const uploadOptions = isPdf
    ? {
        folder: 'portfolio/cv',
        resource_type: 'raw',
        format: 'pdf',
      }
    : {
        folder: 'portfolio',
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      };

  const uploadPromise = new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    uploadStream.end(req.file.buffer);
  });

  const result = await uploadPromise;

  res.status(200).json({
    ok: true,
    message: isPdf ? 'PDF subido correctamente.' : 'Archivo subido correctamente.',
    url: result.secure_url,
    publicId: result.public_id,
  });
});

module.exports = {
  uploadFile,
};
