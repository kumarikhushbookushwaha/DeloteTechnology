var express = require('express');
var userController = require('../controller/userController');
const router = express.Router();

router.route('/login').post(userController.loginUser);
router.route('/signup').post(userController.signUpUser);

module.exports = router;
