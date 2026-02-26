const Course = require('../models/Course');
const createCrudControllers = require('../utils/crudFactory');

module.exports = createCrudControllers(Course, 'Curso');
