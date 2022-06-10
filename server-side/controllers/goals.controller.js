const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');

const { errorGenerator } = require('../utilities/error.generator');
const Goal = require('../models/goals.model');
const User = require('../models/users.model');

// add goal
const addGoal = asyncHandler(async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body || !req.user.id || !isValidObjectId(req.user.id)) {
      return next(errorGenerator('Missing required fields', 400));
    }
    const goal = new Goal({
      title: req.body.title,
      body: req.body.body,
      user: req.user.id,
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

// get goal
const getGoal = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const goal = await Goal.findById(req.params.id);
    if (!user) {
      return next(errorGenerator('User not found', 404));
    }
    if (!req.params.id && !isValidObjectId(req.params.id)) {
      return next(errorGenerator('Invalid id', 400));
    }
    if (!goal) {
      return next(errorGenerator('Goal not found', 404));
    }
    // make sure user owns goal
    if (goal.user.toString() !== user.id.toString()) {
      return next(errorGenerator('Not authorized', 401));
    }
    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
});

// get goals
const getGoals = asyncHandler(async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
});

// update goal
const updateGoal = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const goal = await Goal.findById(req.params.id);
    if (!user) {
      return next(errorGenerator('User not found', 404));
    }
    if (!req.params.id && !isValidObjectId(req.params.id)) {
      return next(errorGenerator('Invalid id', 400));
    }
    if (!goal) {
      return next(errorGenerator('Goal not found', 404));
    }
    // make sure user owns goal
    if (goal.user.toString() !== user.id.toString()) {
      return next(errorGenerator('Not authorized', 401));
    }
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    // make sure user owns goal
    if (goal.user.toString() !== user.id.toString()) {
      return next(errorGenerator('Not authorized', 401));
    }
    res.status(203).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// delete goal
const deleteGoal = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const goal = Goal.findById(req.params.id);
    if (!user) {
      return next(errorGenerator('User not found', 404));
    }
    if (!req.params.id && !isValidObjectId(req.params.id)) {
      return next(errorGenerator('Invalid id', 400));
    }
    // make sure user owns goal
    if (goal.user.toString() !== user.id.toString()) {
      return next(errorGenerator('Not authorized', 401));
    }
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json(goal._id);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  addGoal,
  getGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
