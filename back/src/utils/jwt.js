const jwt = require('jsonwebtoken');
const env = require('../config/env');

function generateToken(payload, expiresIn = '7d') {
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET no está configurado en .env');
  }

  return jwt.sign(payload, env.jwtSecret, { expiresIn });
}

function verifyToken(token) {
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET no está configurado en .env');
  }

  return jwt.verify(token, env.jwtSecret);
}

module.exports = {
  generateToken,
  verifyToken,
};
