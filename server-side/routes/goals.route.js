const router = require('express').Router();
const {
  getGoals,
  getGoal,
  addGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goals.controller');

const { verifAuth } = require('../middlewares/auth.middleware');

router.route('/').get(verifAuth, getGoals).post(verifAuth, addGoal);
router
  .route('/:id')
  .get(verifAuth, getGoal)
  .put(verifAuth, updateGoal)
  .delete(verifAuth, deleteGoal);

module.exports = router;
