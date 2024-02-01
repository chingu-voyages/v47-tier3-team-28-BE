const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		dob: { type: Date, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		profilePhoto: { type: Buffer },
		role: { type: String, enum: ['student', 'instructor', 'admin'], required: true }
	},
	{ collection: 'user' }
);


userSchema.methods.matchPassword = async function (enterPassword) {
	return await bcrypt.compare(enterPassword, this.password)
};

//To encrypt the password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});


const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;