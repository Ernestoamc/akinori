const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/projects.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const projectsRouter = Router();

projectsRouter.get('/', getAll);
projectsRouter.get('/:id', getById);
projectsRouter.post('/', authMiddleware, create);
projectsRouter.put('/:id', authMiddleware, update);
projectsRouter.delete('/:id', authMiddleware, remove);

module.exports = projectsRouter;
