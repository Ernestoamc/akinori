const Experience = require('../models/Experience');
const createCrudControllers = require('../utils/crudFactory');

module.exports = createCrudControllers(Experience, 'Experiencia');
