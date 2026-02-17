const Task = require ("../models/Task");


//POST api tasks

exports.createTask = async (req, res ) =>{
    const task = await Task.create({...req.body , owner: req.user.id});
    res.json (task);
};

// GET api task/me

exports.getMyTasks = async (req, res) =>{
    const tasks = await Task.find({ owner: req.user.id });
    res.json(tasks);
};

// Get all the tasks

exports.getAllTasks = async (req,res) =>{
    const tasks = await Task.find().populate("owner","email");
}

