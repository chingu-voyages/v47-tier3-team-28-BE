const { Router } = require('express');
const { courseEnroll, courseWithdrawl, listEnrolledCourses } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');
const router = Router();

router.post('/student/:studentID/enroll/:courseID', protect, courseEnroll);
router.post('/student/:studentID/withdraw/:courseID', protect, courseWithdrawl);
router.get('/student/:studentID/courses', protect, listEnrolledCourses);


module.exports = router;

