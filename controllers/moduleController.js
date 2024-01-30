const { request } = require("express");
const ModuleModel = require("../models/moduleModel");

const createModule = async(req, res )=> {
    try {

    const{learning_video, course_exercise, learning_material, quiz_text }= req.body;

    const newModule = new ModuleModel({
        learning_video ,
        course_exercise,
        learning_material,
        quiz_text
    })
    
    if(!newModule){
        res.status(400).json({messsage : " u no fit create"})
    }

    res.json({
        course : newModule
    })
}catch {
    res.status(500).json( " error from creating err")
}
}


module.exports = createModule