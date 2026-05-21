const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messagesController');

router.post('/', messageController.createMessage);

router.get('/:conversationId', messageController.getMessage);

module.exports = router;