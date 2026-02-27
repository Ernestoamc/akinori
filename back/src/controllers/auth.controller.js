const asyncHandler = require('../utils/asyncHandler');
const { generateToken } = require('../utils/jwt');
const { comparePassword } = require('../utils/bcrypt');
const env = require('../config/env');

const loginController = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      ok: false,
      message: 'La contraseña es requerida.',
    });
  }

  const isValidPassword = env.adminPasswordHash
    ? await comparePassword(password, env.adminPasswordHash)
    : password === env.adminPassword;

  if (!isValidPassword) {
    return res.status(401).json({
      ok: false,
      message: 'Contraseña incorrecta.',
    });
  }

  const token = generateToken({ role: 'admin' }, '7d');

  res.status(200).json({
    ok: true,
    message: 'Autenticación exitosa.',
    token,
  });
});

module.exports = {
  loginController,
};
