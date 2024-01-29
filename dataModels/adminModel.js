const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
	{

	},
	{ collection: 'admin' }
)

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;