const UserModel = require('../models/userModel')
const CourseModel = require('../models/courseModel')
const InstructorModel = require('../models/instructorModel');
const studentModel = require('../models/studentModel')
const generateToken = require('../utils/generateTokens');
const Role = require('../middleware/role');
const asyncHandler = require('express-async-handler')


// @desc     update password
// @route    GET /api/users/updatePaswword
// @access   Private

const updatePassword = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id).select('+password');
    if (!(await user.matchPassword(req.body.currentPassword, user.password))) {
        res.status(404);
        throw new Error("Your current Password is wrong");
    }
    user.password = req.body.password;
    const updateUserPassword = await user.save();

    res.json({
        message: "password change successfully",
        _id: updateUserPassword._id,
        token: generateToken(user._id),
    });
});

// @desc     get user
// @route    PUT /api/users/:id
// @access   Private

const getUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc     Update user profile
// @route    PUT /api/updateprofile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id).select('-password');

    if (!user) {
        res.status(404).json({ error: "User not found" });
    } else {
        // update user fields based on the request body
        user.firstName = req.body.firstName || user.firstName;;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.profilePhoto = req.body.profilePhoto || user.profilePhoto;
        user.dob = req.body.dob || user.dob;
        user.bio = req.body.bio || user.bio;
        user.specialization = req.body.specialization || user.specialization;
        user.years_of_experience = req.body.years_of_experience || user.years_of_experience;
        user.major = req.body.major || user.major;
        user.role = user.role

        const updatedUser = await user.save();

        res.json(updatedUser);
    }
});

//@desc   get all users list  
//@route  GET /api/users
//@access private admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find({}).select('-password');
    res.json(users);
});

// @desc     Delete a user
// @route    DELETE /api/users/:id
// @access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: "User removed" });
    } else {
        req.status(404);// check
        throw new Error("User not found");
    }
});


// @desc     suspend a user
// @route    PUT /api/users/:id
// @access   Private/Admin

const suspendUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    user.isActive = false;
    await user.save();

    res.json({ message: 'User suspended successfully' })
});

// @desc     suspend a user
// @route    PUT /api/users/:id
// @access   Private/Admin
const reactivateUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    user.isActive = true;
    await user.save();

    res.json({ message: 'User reactivated successfully' })
});
//@desc   get all users list  
//@route  GET /api/users
//@access private admin
const getAllCourse = asyncHandler(async (req, res) => {
    const courses = await CourseModel.find({});
    if (!courses || courses.length === 0) {
        res.json("no courses at this moment")
    }
    res.json(courses);
});


module.exports = {
    updatePassword, getUser, updateUserProfile,
    getAllUsers, deleteUser, getAllCourse,
    suspendUser, reactivateUser
};
