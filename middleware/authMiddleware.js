
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await UserModel.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(404);
        throw new Error('Not authorized, no token');
    }
};


//instructor middleware
const instructor = (req, res, next) => {
    if (req.user && req.user.role === 'instructor') {
        next();
    } else {
        return res.status(401).json({ message: 'Not authorized as you are not an instructor ' });
    }
}

//student
const student = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized as you are not student' });
    }
}

//admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized as you are not admin' })
    }
};
module.exports = { protect, instructor, student, admin };
