const dotenv = require('dotenv');

dotenv.config();

const clientUrlRaw = process.env.CLIENT_URL || '*';
const clientUrlList = clientUrlRaw
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  mongodbUri: process.env.MONGODB_URI || '',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
  clientUrl: clientUrlRaw,
  clientUrlList: clientUrlRaw === '*' ? [] : clientUrlList,
  jwtSecret: process.env.JWT_SECRET || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
};

if (!env.mongodbUri) {
  throw new Error('MONGODB_URI es requerido en el archivo .env');
}

if (!env.jwtSecret || env.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET es requerido y debe tener al menos 32 caracteres.');
}

if (!env.adminPassword && !env.adminPasswordHash) {
  throw new Error('Debes configurar ADMIN_PASSWORD o ADMIN_PASSWORD_HASH en el archivo .env.');
}

if (env.nodeEnv === 'production') {
  if (!env.adminPasswordHash) {
    throw new Error('En producción debes usar ADMIN_PASSWORD_HASH en lugar de ADMIN_PASSWORD.');
  }
}

module.exports = env;
