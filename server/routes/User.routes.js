const express = require('express');
const UserController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authenticateToken, UserController.getUserProfile);

module.exports = router;
