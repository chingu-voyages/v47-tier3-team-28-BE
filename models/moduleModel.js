const mongoose = require('mongoose');


const moduleScheme = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        learning_video: {title: { type: String, required: true },
		url: { type: String, required: true },
		duration: { type: Number, required: true } },

        course_exercise: {
            title: { type: String, required: true },
            question: { type: String, required: true },
			solution: { type: String, required: true },
            // ... other properties of course_exercise
        },

        learning_material:  {
            title: { type: String, required: true },
            description: { type: String, required: true },
			fileUrl: { type: String, required: true }},

			
        quiz_text:
		{title :{ type: String, required: true },
		questions: [{
			question: { type: String, required: true },
			options: [{ type: String, required: true }],
			correctAnswer: { type: String, required: true }
		}]}
	
    },
    { collection: 'module' }
);


module.exports = mongoose.model('Module', moduleScheme);

// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const moduleSchema = new Schema(
// 	{

// 	},
// 	{ collection: 'module' }
// )

// const ModuleModel = mongoose.model('Module', moduleSchema);

// module.exports = ModuleModel;