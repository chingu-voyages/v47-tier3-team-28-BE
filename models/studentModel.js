const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = require("./userModel");

const studentSchema = new Schema(
	{
		major: { type: String },
	},
	{ collection: 'student' }
)

const StudentModel = UserModel.discriminator('Student', studentSchema);

module.exports = StudentModel;