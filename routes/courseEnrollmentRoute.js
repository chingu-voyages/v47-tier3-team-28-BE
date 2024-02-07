const { Router } = require('express');
const { courseEnroll, courseWithdrawl, listEnrolledCourses } = require('../controllers/enrollmentController');
const router = Router();

router.post('/student/:studentID/enroll/:courseID', courseEnroll);
router.post('/student/:studentID/withdraw/:courseID', courseWithdrawl);
router.get('/student/:studentID/courses', listEnrolledCourses);


module.exports = router;

