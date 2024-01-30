const express =  require("express")
const router = express.Router()
const { createCourse}  = require("../controllers/courseController")

//Creating course routes using express.Router() which allows you to modularize your routes into separate routers and then we call it into the  server .js' express() instance.

router.post('/createcourse' , createCourse )


module.exports = router


