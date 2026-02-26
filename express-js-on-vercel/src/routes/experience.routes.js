const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/experience.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const experienceRouter = Router();

experienceRouter.get('/', getAll);
experienceRouter.get('/:id', getById);
experienceRouter.post('/', authMiddleware, create);
experienceRouter.put('/:id', authMiddleware, update);
experienceRouter.delete('/:id', authMiddleware, remove);

module.exports = experienceRouter;
