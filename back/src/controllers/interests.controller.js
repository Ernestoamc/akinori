const Interest = require('../models/Interest');
const createCrudControllers = require('../utils/crudFactory');

module.exports = createCrudControllers(Interest, 'Interés');
