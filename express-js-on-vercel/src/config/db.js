const mongoose = require('mongoose');
const env = require('./env');

async function connectDatabase() {
  mongoose.set('strictQuery', true);

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  });

  return mongoose.connection;
}

module.exports = connectDatabase;
