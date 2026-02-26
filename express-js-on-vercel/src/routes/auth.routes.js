const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { loginController } = require('../controllers/auth.controller');

const authRouter = Router();

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		ok: false,
		message: 'Demasiados intentos de login. Intenta de nuevo en unos minutos.',
	},
});

authRouter.post('/login', loginLimiter, loginController);

module.exports = authRouter;
