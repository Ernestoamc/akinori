const app = require('../src/app');
const connectDatabase = require('../src/config/db');
const configureCloudinary = require('../src/config/cloudinary');

let isInitialized = false;

module.exports = async (req, res) => {
  if (!isInitialized) {
    await connectDatabase();
    configureCloudinary();
    isInitialized = true;
  }

  return app(req, res);
};
