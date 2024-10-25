const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/profile/:id', authMiddleware, getUserProfile);
router.put('/profile/:id', authMiddleware, updateUserProfile);

module.exports = router;
