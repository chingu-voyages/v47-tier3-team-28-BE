const express = require('express');
const router = express.Router();

const { getAllCourse, suspendUser, reactivateUser, deleteUser, getAllUsers, } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware')


router.get('/users', protect, admin, getAllUsers);
router.get('/course', protect, admin, getAllCourse);
router.put('/suspend/:userId', protect, admin, suspendUser);
router.put('/reactivate/:userId', protect, admin, reactivateUser);
router.delete('/:id', protect, admin, deleteUser)


module.exports = router;