const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        instructor_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        //instructor_id: { type: String, required: true },
        module_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
        category: { enum: ['comp science', 'Art', 'Drama'] },
        description: { type: String, required: true },
        title: { type: String, required: true },
        duration: { type: Number, required: true },
    },
    { collection: 'course' }
);

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;



// const { Schema } = mongoose;

// const courseSchema = new Schema(
// 	{
// 		category: { type: String, required: true },
// 		description: { type: String, required: true },
// 		title: { type: String, required: true },
// 		duration: { type: Number},
// 		instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
// 		// Array of module IDs
// 		modules: [{ type: Schema.Types.ObjectId, ref: 'Module', requried: true }]
// 	},
// 	{ collection: 'course' }
// )

// const CourseModel = mongoose.model('Course', courseSchema);

// module.exports = CourseModel;