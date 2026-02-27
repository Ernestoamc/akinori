const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/courses.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const coursesRouter = Router();

coursesRouter.get('/', getAll);
coursesRouter.get('/:id', getById);
coursesRouter.post('/', authMiddleware, create);
coursesRouter.put('/:id', authMiddleware, update);
coursesRouter.delete('/:id', authMiddleware, remove);

module.exports = coursesRouter;
