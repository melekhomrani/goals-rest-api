const router = require('express').Router();
const {
  getGoals,
  getGoal,
  addGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goals.controller');

router.route('/').get(getGoals).post(addGoal);
router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal);

module.exports = router;
