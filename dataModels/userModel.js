const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{

	},
	{ collection: 'user' }
)

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;