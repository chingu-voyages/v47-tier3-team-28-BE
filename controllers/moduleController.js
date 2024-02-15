const { request } = require("express");
const ModuleModel = require("../models/moduleModel");

const createModule = async (req, res) => {

    const { learning_video, course_exercise, learning_material, quiz_text } = req.body;

    const newModule = new ModuleModel({
        learning_video,
        course_exercise,
        learning_material,
        quiz_text
    })

    if (!newModule) {
        res.status(400).json({ messsage: " u no fit create" })
    }
    try {

        await newModule.save()

        res.json({
            course: newModule,
        })
    } catch (error) {
        console.log(error + "Asem aba");
        res.status(500).json(" error from creating err")
    }
}
// mongoose.Schema.ObkectId
//ref : "Courdsw"

const getAllModules = async (req, res) => {
    try {
        const modules = await ModuleModel.find();
        res.json({ modules });
    } catch (error) {
        console.error("Error fetching modules:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const module = await ModuleModel.findById(moduleId);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        await ModuleModel.findByIdAndDelete(moduleId);
        res.status(204).json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error("Error deleting module:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const updateModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { learning_video, course_exercise, learning_material, quiz_text } = req.body;

        const updatedModule = await ModuleModel.findByIdAndUpdate(moduleId, {
            learning_video,
            course_exercise,
            learning_material,
            quiz_text
        }, { new: true });

        if (!updatedModule) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.json({ module: updatedModule });
    } catch (error) {
        console.error("Error updating module:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = { createModule, getAllModules, deleteModule, updateModule }