const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/login')
  .get(userController.loginPage)
  .post(userController.loginUser);

router
  .route('/signup')
  .get(userController.signupPage)
  .post(userController.signupUser);

router
  .route('/logout')
  .get(userController.logoutUser);

module.exports = router;