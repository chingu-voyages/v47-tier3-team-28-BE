const mongoose = require('mongoose');

const notFound = (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // check if the error is a CastError for ObjectId
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: 'This Id is not valid' });
    }

    res.status(statusCode);
    res.json({
        message: err.message,
        stack: null,
    });
};

module.exports = { notFound, errorHandler };
