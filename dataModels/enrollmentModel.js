const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
	{

	},
	{ collection: 'enrollment' }
)

const EnrollmentModel = mongoose.model('Enrollment', enrollmentSchema);

module.exports = EnrollmentModel;