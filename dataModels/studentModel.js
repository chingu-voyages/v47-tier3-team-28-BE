const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
	{

	},
	{ collection: 'student' }
)

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;