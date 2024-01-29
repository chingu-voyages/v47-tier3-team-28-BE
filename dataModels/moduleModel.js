const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
	{

	},
	{ collection: 'module' }
)

const ModuleModel = mongoose.model('Module', moduleSchema);

module.exports = ModuleModel;