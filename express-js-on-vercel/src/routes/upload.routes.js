const { Router } = require('express');
const { uploadImage } = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

const uploadRouter = Router();

uploadRouter.post('/', authMiddleware, upload.single('image'), uploadImage);

module.exports = uploadRouter;
