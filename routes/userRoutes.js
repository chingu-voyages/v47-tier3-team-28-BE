const express = require('express');
const router = express.Router();

const { updatePassword, getUser, updateUserProfile, } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')


router.get('/:id', getUser, protect);
router.put('/updatePassword', protect, updatePassword);
router.put('/updateProfile', protect, updateUserProfile);
module.exports = router;


