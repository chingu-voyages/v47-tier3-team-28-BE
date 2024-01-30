import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		dob: { type: Date, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		profilePhoto: { type: Buffer },
		type: { type: String, enum: ['student', 'instructor', 'admin'], required: true }
	},
	{ collection: 'user' }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;