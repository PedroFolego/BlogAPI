const express = require('express');
const { validateLogin } = require('../controllers.js/loginController');

const router = express.Router();

router.use('/login', validateLogin);
// router.use('/', );

module.exports = router;