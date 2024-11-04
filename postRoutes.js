const express = require('express');
const { createPost } = require('../controllers/postController');
const authmiddleware = require('../utils/authmiddleware');
const router = express.Router();

router.post('/create', authmiddleware, createPost);

module.exports = router;
