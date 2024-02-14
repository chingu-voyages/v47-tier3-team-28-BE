const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
	{
		studentID: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    	courseID: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
		enrollmentDate: { type: Date, required: false}
	},
	{ collection: 'enrollment' }
)

const EnrollmentModel = mongoose.model('Enrollment', enrollmentSchema);

module.exports = EnrollmentModel;