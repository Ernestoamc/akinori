function notFound(_req, _res, next) {
  const error = new Error('Ruta no encontrada');
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    ok: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = {
  notFound,
  errorHandler,
};
