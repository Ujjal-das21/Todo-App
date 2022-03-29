const { response } = require('express');
const Task = require('../models/Task');

module.exports.list = function(req,res){
    Task.find({},function(err,Task){
        if(err){
            console.log('error in fetching contacts');
    
            return;
    
        }
        res.render('tasks', {
            title: 'task',
            toDoTask: Task,
           
        });
       
    });
    
}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return  res.redirect('/task/list');
    }

    return res.render('user_sign_up',{
        title:'User|Sign Up'
    });
}

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
      return  res.redirect('/task/list');
    }
    return res.render('user_sign_in',{
        title:'User|Sign In'
    });

}
module.exports.destroySession =function(req,res){
    req.logout();
    return res.redirect('/');


}

