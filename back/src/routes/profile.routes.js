const { Router } = require('express');
const { getProfile, updateProfile, downloadCv } = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const profileRouter = Router();

profileRouter.get('/download-cv', downloadCv);
profileRouter.get('/', getProfile);
profileRouter.put('/', authMiddleware, updateProfile);

module.exports = profileRouter;
