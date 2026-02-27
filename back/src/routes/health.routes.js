const { Router } = require('express');
const { healthController } = require('../controllers/health.controller');

const healthRouter = Router();

healthRouter.get('/', healthController);

module.exports = healthRouter;
