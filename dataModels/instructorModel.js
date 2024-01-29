const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
	{

	},
	{ collection: 'instructor' }
)

const InstructorModel = mongoose.model('Instructor', instructorSchema);

module.exports = InstructorModel;