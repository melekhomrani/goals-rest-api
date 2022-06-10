const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { errorGenerator } = require('../utilities/error.generator');

const User = require('../models/users.model');

const verifAuth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id }, { password: 0 });
    if (!user) {
      return next(errorGenerator('User not found', 404));
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    next(errorGenerator('Invalid token', 401));
  }
});

module.exports = {
  verifAuth,
};
