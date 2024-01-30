import mongoose from "mongoose";
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
	{
		student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    	course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
		enrollmentDate: { type: Date, required: true }
	},
	{ collection: 'enrollment' }
)

const EnrollmentModel = mongoose.model('Enrollment', enrollmentSchema);

module.exports = EnrollmentModel;