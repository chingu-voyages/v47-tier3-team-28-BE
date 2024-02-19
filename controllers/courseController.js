const CourseModel = require("../models/courseModel");
//const {Module} = require('../models/moduleModel');
const { createModule } = require("./moduleController");


const createCourse = async (req, res) => {

    const { instructor_id, category, description, title, duration, module_ids } = req.body; //Object deconstructing

    // const existingModules = await Module.find({ _id: { $in: module_ids } });
    //     if (existingModules.length !== module_ids.length) {
    //         return res.status(400).json({ error: 'Invalid module IDs' });
    //     }
    //creating an instance of the request params based on the course model
    const newCourse = await new CourseModel({
        instructor_id,
        category,
        description,
        title,
        duration,
    })
    //.populate('Module')

    console.log(newCourse);
    //console.log(newCourse.module_id); 

    //checking if the instance is not how it is suppose to look exactly like throw an error and status code
    if (!newCourse) {
        res.status(400).json({ err: "3nfa" })
    }
    //else save the course into database and return a 201 status with a json of how the course instance looks like
    try {
        await newCourse.save()
        // Check if module_ids are provided and create modules if necessary
        if (module_ids && module_ids.length > 0) {
            // Iterate over each module ID and create a new module for the course
            for (const module_id of module_ids) {
                await createModule({ body: { ...req.body[module_id] } }, res);
                // Call your createModule function here passing the course ID and module ID
                // Example: await createModule(course_id, module_id);
            }
        }
    } catch (error) {
        console.log(error + "Asem aba");
    }


    res.status(201).json({
        Aba: newCourse
    })
}

const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteCourseById = async (req, res) => {
    try {
        const { course_id } = req.params; // Use req.params.course_id

        const delam = await CourseModel.findById(course_id);

        if (!delam) {
            return res.status(400).json({ error: "Course not found" });
        }

        await CourseModel.findByIdAndDelete(course_id);
        return res.status(204).json({ message: "Course deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateCourse = async (req, res) => {

    const { course_id } = req.params.id; // Use req.params.course_id

    const { instructor_id, module_id, category, description, title, duration } = req.body; //Object deconstructing 

    const update = await CourseModel.findById(course_id);

    //checking if the instance is not how it is suppose to look exactly like throw an error and status code
    if (!update) {
        return res.status(400).json({ error: "Cannot update course" });
    }

    //else update the the keys based on the provided we deconstructed on line 54 and then save the  changes
    update.instructor_id = instructor_id
    update.module_id = module_id
    update.category = category
    update.description = description
    update.title = title
    update.duration = duration

    await update.save()
}


module.exports = { createCourse, getAllCourses, deleteCourseById, updateCourse }
