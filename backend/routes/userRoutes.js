const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const upload = require('../middleware/multer')

router.get('/me', userController.getUser);

router.put('/updateprofile', upload.single('avatar'), userController.updatedata)

router.get('/search', userController.searchUser)

module.exports = router;