const express = require('express');
const router = express.Router();

const { signupStudent, signupInstructor, login } = require('../controllers/userController');
const { protect, instructor, student, admin } = require('../middleware/authMiddleware')


router.post('/register/instructor', signupInstructor);
router.post('/register/student', signupStudent);
router.get('/login', login)


module.exports = router;


