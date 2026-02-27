const mongoose = require('mongoose');
const connectDatabase = require('../config/db');
const configureCloudinary = require('../config/cloudinary');

async function testMongoConnection() {
  await connectDatabase();
  await mongoose.connection.db.admin().command({ ping: 1 });
  return true;
}

async function testCloudinaryConnection() {
  const cloudinary = configureCloudinary();

  if (!cloudinary) {
    throw new Error(
      'Faltan variables de Cloudinary (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).',
    );
  }

  await cloudinary.api.ping();
  return true;
}

async function runConnectionTests() {
  console.log('Iniciando pruebas de conexión...');

  const results = {
    mongo: { ok: false, message: '' },
    cloudinary: { ok: false, message: '' },
  };

  try {
    await testMongoConnection();
    results.mongo = { ok: true, message: 'MongoDB conectado correctamente.' };
  } catch (error) {
    results.mongo = { ok: false, message: error.message };
  }

  try {
    await testCloudinaryConnection();
    results.cloudinary = { ok: true, message: 'Cloudinary conectado correctamente.' };
  } catch (error) {
    results.cloudinary = { ok: false, message: error.message };
  }

  console.log('\nResultado:');
  console.log(`- MongoDB: ${results.mongo.ok ? 'OK' : 'FAIL'} -> ${results.mongo.message}`);
  console.log(
    `- Cloudinary: ${results.cloudinary.ok ? 'OK' : 'FAIL'} -> ${results.cloudinary.message}`,
  );

  const allOk = results.mongo.ok && results.cloudinary.ok;

  await mongoose.disconnect().catch(() => null);

  if (!allOk) {
    process.exitCode = 1;
  }
}

runConnectionTests().catch(async (error) => {
  console.error('Error inesperado en pruebas de conexión:', error);
  await mongoose.disconnect().catch(() => null);
  process.exit(1);
});
