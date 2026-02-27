const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/interests.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const interestsRouter = Router();

interestsRouter.get('/', getAll);
interestsRouter.get('/:id', getById);
interestsRouter.post('/', authMiddleware, create);
interestsRouter.put('/:id', authMiddleware, update);
interestsRouter.delete('/:id', authMiddleware, remove);

module.exports = interestsRouter;
