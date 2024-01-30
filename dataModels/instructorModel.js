import mongoose from "mongoose";
const { Schema } = mongoose;
const UserModel = require("./userModel");

const instructorSchema = new Schema(
	{
		bio: { type: String, required: true },
		specialization: { type: String, required: true },
		years_of_experience: { type: Number, required: true }
	},
	{ collection: 'instructor' }
)

const InstructorModel = UserModel.discriminator('Instructor', instructorSchema);

module.exports = InstructorModel;