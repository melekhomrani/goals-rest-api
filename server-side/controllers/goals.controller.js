const asyncHandler = require('express-async-handler');
const { errorGenerator } = require('../utilities/error.generator');
const Goal = require('../models/goals.model');

// add goal
const addGoal = asyncHandler(async (req, res, next) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

// get goal
const getGoal = asyncHandler(async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
});

// get goals
const getGoals = asyncHandler(async (req, res, next) => {
  try {
    const goals = await Goal.find({});
    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
});

// update goal
const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(203).json(goal);
  } catch (error) {
    next(error);
  }
};

// delete goal
const deleteGoal = asyncHandler(async (req, res, next) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
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
