function asyncHandler(controller) {
  return function wrappedAsyncHandler(req, res, next) {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
