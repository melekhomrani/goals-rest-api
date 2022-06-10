const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/users.model');
const asyncHandler = require('express-async-handler');
const { errorGenerator } = require('../utilities/error.generator');

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return next(errorGenerator('Missing required fields', 400));
    }
    if (await User.findOne({ email })) {
      return next(errorGenerator('User already exists', 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();
    res.status(201).json({ email, name, id: user._id });
  } catch (error) {
    next(error);
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ email: user.email, name: user.name });
  } catch (error) {
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(errorGenerator('User not found', 404));
    }
    // const isMatch = req.body.password === (await user.password);
    let isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return next(errorGenerator('Incorrect password', 401));
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
});

function generateToken(id) {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const { _id, email, name } = await User.findById(req.user.id);
    res.status(200).json({ id: _id, email, name });
  } catch (error) {
    next(error);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    // delete authoization header
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  registerUser,
  updateUser,
  loginUser,
  getUser,
  deleteUser,
  logoutUser,
};
