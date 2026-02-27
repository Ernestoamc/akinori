const { Router } = require('express');
const { uploadFile } = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

const uploadRouter = Router();

uploadRouter.post('/', authMiddleware, upload.single('file'), uploadFile);

module.exports = uploadRouter;
