const asyncHandler = require('express-async-handler');

const errorHandler = async (err, req, res, next) => {
  const errMsg = err.message || 'something went wrong';
  const errStatus = err.status || 500;
  const errStack = process.env.NODE_ENV === 'development' ? err.stack : null;
  console.log('error handler');

  return res.status(errStatus).json({
    message: errMsg,
    status: errStatus,
    stack: errStack,
  });
};

module.exports = errorHandler;
