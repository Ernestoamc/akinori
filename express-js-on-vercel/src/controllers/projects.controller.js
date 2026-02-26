const Project = require('../models/Project');
const createCrudControllers = require('../utils/crudFactory');

module.exports = createCrudControllers(Project, 'Proyecto');
