const User = require('../models/userModel')
const generateToken = require('../utils/generateTokens');

//@desc   signup new user instructor
//@route  POST /api/register/instructor
//@access Public
const signupInstructor = async (req, res) => {
    const { firstName, lastName, dob, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const instructor = await User.create({
        firstName,
        lastName,
        dob,
        email,
        password,
        type: 'instructor',
    });
    if (instructor) {
        res.status(201).json({
            message: 'Instructor registration successful',
            _id: instructor._id,
            firstName: instructor.firstName,
            lastName: instructor.lastName,
            email: instructor.email,
            dob: instructor.dob,
            type: instructor.type,
            token: generateToken(instructor._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};



//@desc   signup new user student
//@route  POST /api/register/student
//@access Public
const signupStudent = async (req, res) => {
    const { firstName, lastName, dob, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const student = await User.create({
        firstName,
        lastName,
        dob,
        email,
        password,
        type: 'student',
    });
    if (student) {
        res.status(201).json({
            message: 'student registration successful',
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            dob: student.email,
            email: student.email,
            type: student.type,
            token: generateToken(student._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};






// @desc     Auth the user & get token
// @route    GET /api/users/login
// @access   Public
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
};

module.exports = { signupStudent, signupInstructor, login };
