const UserModel = require('../models/userModel')
const InstructorModel = require('../models/instructorModel');
const studentModel = require('../models/studentModel')
const generateToken = require('../utils/generateTokens');
const Role = require('../middleware/role');
const asyncHandler = require('express-async-handler')
//@desc   signup new user instructor
//@route  POST /api/register/instructor
//@access Public
const signupInstructor = asyncHandler(async (req, res) => {
    const { firstName, lastName, profilePhoto, dob, email, password, bio, specialization, years_of_experience } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }
    const instructor = new InstructorModel({
        firstName,
        lastName,
        profilePhoto,
        dob,
        email,
        password,
        bio,
        specialization,
        years_of_experience,
        role: Role.Instructor,
    });
    await instructor.save();
    if (instructor) {
        res.status(201).json({
            message: 'Instructor registration successful',
            _id: instructor._id,
            firstName: instructor.firstName,
            lastName: instructor.lastName,
            profilePhoto: instructor.profilePhoto,
            email: instructor.email,
            dob: instructor.dob,
            bio: instructor.bio,
            specialization: instructor.specialization,
            years_of_experience: instructor.years_of_experience,
            role: Role.Instructor,
            token: generateToken(instructor._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});



//@desc   signup new user student
//@route  POST /api/register/student
//@access Public
const signupStudent = asyncHandler(async (req, res) => {
    const { firstName, profilePhoto, lastName, dob, email, password, major } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const student = new studentModel({
        firstName,
        lastName,
        profilePhoto,
        dob,
        email,
        password,
        major,
        role: Role.Student,

    });
    await student.save();
    if (student) {
        res.status(201).json({
            message: 'student registration successful',
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            profilePhoto: student.profilePhoto,
            major: student.major,
            dob: student.email,
            email: student.email,
            role: Role.Student,
            token: generateToken(student._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});






// @desc     Auth the user & get token
// @route    GET /api/users/login
// @access   Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Invalid username or password');
    }
    if (!user.isActive) {
        res.status(403).json({ message: 'You have been suspended. Contact admin for reactivation.' });
        return; // stop further execution
    }
    if (await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});




module.exports = {
    signupStudent, signupInstructor, login
};