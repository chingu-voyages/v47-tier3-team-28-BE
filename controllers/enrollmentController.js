const EnrollmentModel = require('../models/enrollmentModel');
const UserModel = require('../models/userModel');
const CourseModel = require('../models/courseModel');
const ObjectID = require('mongodb').ObjectId;

/**
 * @api {post} /api/v1/enrollment/student/:studentID/enroll/:courseID Enroll a student in a course
 * @apiName courseEnroll
 * @apiGroup enrollment
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} studentID Unique identifier of the student.
 * @apiParam {String} courseID Unique identifier of the course.
 * @apiParam {String} [enrollmentDate] Date of enrollment. If not provided, the current date and time will be used.
 *
 * @apiSuccessExample {json} Success Response (201 Created):
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "Student Successfully enrolled in the course",
 *      "studentID": "65bb6f9b4c492b5d8279a03b",
 *      "courseID": "65c2580585653aec96350128",
 *      "enrollmentDate": "2024-02-10T12:00:00Z"
 *    }
 *
 */

const courseEnroll = async(req, res) => {
    try{
        const { studentID, courseID } = req.params;
        const { enrollmentDate } = req.body;

        // Check if user or course doesn't exist; searchRecordById will handle the response
        const userExists = await searchRecordById("user", studentID, res);
        if(!userExists) return;

        const courseExists = await searchRecordById("course", courseID, res);
        if(!courseExists) return;

        const alreadyEnrolled = await EnrollmentModel.findOne({studentID, courseID});
    
        if(alreadyEnrolled){
            res.status(409).json({error: 'User already Enrolled in the course'});
            return;
        };
        
                
        const enrollment = new EnrollmentModel({
            studentID,
            courseID,
            enrollmentDate: enrollmentDate ? enrollmentDate : new Date(),
        });
    
        await enrollment.save();

        res.status(201).json({
            message: 'Student Successfully enrolled in the course',
            studentID: enrollment.studentID,
            courseID: enrollment.courseID,
            enrollmentDate: enrollment.enrollmentDate,
        });

    }
    catch(error){
        res.status(422).json({ error: 'Invalid Enrollment Data', details: 'Fileds: studentID, courseID, enrollmentDate' });
        console.error(error);
    };
};


/**
 * @api {post} /api/v1/enrollment/student/:studentID/withdraw/:courseID withdraw a student from a course
 * @apiName courseWithdrawl
 * @apiGroup enrollment
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} studentID Unique identifier of the student.
 * @apiParam {String} courseID Unique identifier of the course.
 *
 * @apiSuccessExample {json} Success Response (200 Ok):
 *    HTTP/1.1 200 Ok
 *    {
 *      "message": "Student Successfully withdrew from course",
 *      "studentID": "65bb6f9b4c492b5d8279a03b",
 *      "courseID": "65c2580585653aec96350128",
 *      "enrollmentDate": ""
 *    }
 *
 */
const courseWithdrawl = async(req, res) => {
    try{
        const { studentID, courseID } = req.params;

        // Check if user or course doesn't exist; searchRecordById will handle the response
        const userExists = await searchRecordById("user", studentID, res);
        if(!userExists) return;
        
        const courseExists = await searchRecordById("course", courseID, res);
        if(!courseExists) return;
    
        const enrollment = await EnrollmentModel.findOne({studentID, courseID});

        if (!enrollment) {
            res.status(404).json({
                message: "Student is not enrolled in the given course",
            });
            return;
        }

        await enrollment.deleteOne();
        res.status(200).json({ 
            message: "Student Successfully withdrew from course",
            studentID: enrollment.studentID,
            courseID: enrollment.courseID,
            enrollmentDate: enrollment.enrollmentDate, 
        });

    }catch(error){
        res.status(500).json({ message: "Internal Server Error" });
        console.error(error);
    }

};


/**
 * @api {post} /api/v1/enrollment/student/:studentID/courses list enrolled courses
 * @apiName listEnrolledCourses
 * @apiGroup enrollment
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} studentID Unique identifier of the student.
 *
 * @apiSuccessExample {json} Success Response (200 Ok):
 *    HTTP/1.1 200 Ok
 *    {
 *      "category": "xyz",
 *      "_id": "65c2580585653aec96350128", // course ID
 *      "title": "Intro to OOP",
 *      ...
 *    }
 *
 */
const listEnrolledCourses = async (req, res) => {
    try {
        const { studentID } = req.params;

        // Find all enrollment records for the given studentID
        const enrollment = await EnrollmentModel.find({ studentID });

        // Extract courseIDs from the enrollment records
        const courseIds = enrollment.map((record) => record.courseID);

        // Find all enrolled courses using $in operator and populate details
        const enrolledCourses = await CourseModel.find({ _id: { $in: courseIds } });

        res.json(enrolledCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message || 'An unexpected error occurred' });
    }
};

// This function searches a record by id for 
// a user or course collection and handles the response
async function searchRecordById(collectionName, id, res) {
    try {
        let recordExists = false;

        if (collectionName === "user") {
            recordExists = await UserModel.exists({ "_id": new ObjectID(id) });
        } else if (collectionName === "course") {
            recordExists = await CourseModel.exists({ "_id": new ObjectID(id) });
        }

        if (!Boolean(recordExists)) {
            res.status(404).json({ 
                error: `${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} not found`, 
                details: `${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} does not exist in the system` 
            });
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return false;
    }
}

module.exports = {
    courseEnroll, courseWithdrawl, listEnrolledCourses,
};