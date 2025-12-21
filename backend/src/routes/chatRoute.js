const express = require('express');
const router = express.Router();
const { getStreamChatToken } = require('../controllers/chatController');
const { protectRoute } = require('../middleware/protectRoute');

router.get('/token', protectRoute, getStreamChatToken)

module.exports = router;