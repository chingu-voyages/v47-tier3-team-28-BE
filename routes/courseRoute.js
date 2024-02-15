const express =  require("express")
const router = express.Router()
const { createCourse, getAllCourses, deleteCourseById, updateCourse }  = require("../controllers/courseController")

//Creating course routes using express.Router() which allows you to modularize your routes into separate routers and then we call it into the  server .js' express() instance.

router.post('/createcourse' , createCourse )
router.get('/getAllCourses' , getAllCourses )
router.delete('/deleteCourseById' , deleteCourseById )
router.post('/updateCourse' , updateCourse )


module.exports = router


