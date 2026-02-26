const { Router } = require('express');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const profileRouter = Router();

profileRouter.get('/', getProfile);
profileRouter.put('/', authMiddleware, updateProfile);

module.exports = profileRouter;
