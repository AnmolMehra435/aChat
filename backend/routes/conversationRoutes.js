const express = require('express')
const router = express.Router();
const conversationController = require('../controller/conversationController.js');

router.get('/', conversationController.getUserConversation);
router.post('/create', conversationController.createConversation)

module.exports = router