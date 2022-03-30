const Task = require("../../../models/Task");

module.exports.index  =function(req,res){
    return res.json(200,{
        message:"list of task",
        tasks:Task
    });
}