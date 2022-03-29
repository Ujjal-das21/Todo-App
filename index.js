const exp = require('constants');
const { query } = require('express');
const express = require('express');
const port = 8000;
app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

var path = require('path');

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const Task = require('./models/Task');
const User = require('./models/User');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use('/',require('./routes'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/',require('./routes/index'));
app.get('/delete-task/', (req, res) => {
    //console.log(req.params);
    //let id = req.params.id;
    console.log(req.query);
    let id = req.query.id;
    // let taskIndex = task.find(task => task.id == id);
    // console.log(taskIndex);
    // if (taskIndex != -1) {
    //     task.splice(taskIndex, 1);
    // }
    

    Task.findOneAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database',id);
            return;
        }
        return res.redirect('back');
    })
    

});
app.post('/create-task', function(req, res){
    // console.log(req.id);
    console.log(req.body);
    // console.log(req.body.description);
    // console.log(req.body.due_date);
    // description:req.body.description,
    // category:req.body.category,
    // due_date:req.body.due_date
    // task.push(req.body);

    Task.create({
         id: req.body.id,
        description: req.body.description,
        category: req.body.category,
        due_date: req.body.due_date,
    }, function (err, newTask) {
        if (err) {
            console.log('Error in creating a task!')
            return;
        }
        // console.log('******', newTask);
        return res.redirect('back');
    })
});
app.post('/create',function(req,res){
    if(req.body.password != req.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up'); return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user in signing up'); return;
                } 
                return res.redirect('/task/sign-in');

            })
        }
        else{
            return response.redirect('back');
        }


    });

});
app.get('/create-session',function(req,res){

});
app.listen(port, function (err) {
    if (err) {
        console.log('error in running server');

    }
    console.log('Server is up and running on port:', port);
});