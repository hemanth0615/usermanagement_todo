// routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// User signup route
router.post('/signup', authController.signup);

// User login route
router.post('/login', authController.login);

module.exports = router;
