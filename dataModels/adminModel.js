import mongoose from "mongoose";
const { Schema } = mongoose;
const UserModel = require("./userModel");

const adminSchema = new Schema(
	{

	},
	{ collection: 'admin' }
)

const AdminModel = UserModel.discriminator('Admin', adminSchema);

module.exports = AdminModel;