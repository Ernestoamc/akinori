const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/education.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const educationRouter = Router();

educationRouter.get('/', getAll);
educationRouter.get('/:id', getById);
educationRouter.post('/', authMiddleware, create);
educationRouter.put('/:id', authMiddleware, update);
educationRouter.delete('/:id', authMiddleware, remove);

module.exports = educationRouter;
