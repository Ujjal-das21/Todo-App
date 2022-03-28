const Task = require('../models/Task');
module.exports.list = function(req,res){
    Task.find({},function(err,Task){
        if(err){
            console.log('error in fetching contacts');
    
            return;
    
        }
        res.render('tasks', {
            title: 'task',
            toDoTask: Task
        });
       
    });
    
}