const { Router } = require('express');
const { courseEnroll } = require('../controllers/enrollmentController');
const router = Router();

router.post('/courseEnroll', courseEnroll);

module.exports = router;

