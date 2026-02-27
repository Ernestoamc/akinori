const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/skills.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const skillsRouter = Router();

skillsRouter.get('/', getAll);
skillsRouter.get('/:id', getById);
skillsRouter.post('/', authMiddleware, create);
skillsRouter.put('/:id', authMiddleware, update);
skillsRouter.delete('/:id', authMiddleware, remove);

module.exports = skillsRouter;
