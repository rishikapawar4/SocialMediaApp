const express = require('express');
const { followUser } = require('../controllers/userController');
const authmiddleware = require('../utils/authmiddleware');
const router = express.Router();

router.post('/follow', authmiddleware, followUser);

module.exports = router;
