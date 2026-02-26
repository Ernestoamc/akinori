const Education = require('../models/Education');
const createCrudControllers = require('../utils/crudFactory');

module.exports = createCrudControllers(Education, 'Educación');
