// import mongoose from "mongoose";
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