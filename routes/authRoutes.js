const express = require('express');
const router = express.Router();

const { signupStudent, signupInstructor, login } = require('../controllers/authController');


router.post('/register/instructor', signupInstructor);
router.post('/register/student', signupStudent);
router.post('/login', login);
// 65bb58a45b0800dd8aedfa0c
module.exports = router;