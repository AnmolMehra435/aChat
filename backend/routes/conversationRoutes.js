const express = require('express')
const router = express.Router();
const conversationController = require('../controllers/conversationController.js');

router.get('/', conversationController.getUserConversation);
router.post('/create', conversationController.createConversation)
router.get('/test', (req, res) => {
    res.json({
        "message":"working"
    })
})

module.exports = router