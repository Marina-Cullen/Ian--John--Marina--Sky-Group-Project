const express = require('express');
const LikeController = require('../controllers/LikeController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/like', authenticateToken, LikeController.likeIdea);
router.delete('/unlike', authenticateToken, LikeController.unlikeIdea);

module.exports = router;
