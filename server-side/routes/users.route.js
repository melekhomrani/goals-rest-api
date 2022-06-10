const router = require('express').Router();
const { verifAuth } = require('../middlewares/auth.middleware');
const {
  registerUser,
  updateUser,
  getUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require('../controllers/users.controller');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.put('/me/:id', updateUser);

router.get('/me/', verifAuth, getUser);

router.delete('/me/:id', deleteUser);

module.exports = router;
