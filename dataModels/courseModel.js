const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{

	},
	{ collection: 'course' }
)

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;