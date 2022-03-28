const exp = require('constants');
const { query } = require('express');
const express = require('express');
var path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
const Task = require('./models/Task');
app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use('/',require('./routes'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/',require('./routes/index'));


var task = [
    {
        id: 1,
        description: "minor project",
        category: "work",
        due_date: "15/4/22"
    },
    {

        id: 2,
        description: "gym fee",
        category: "personal",
        due_date: "15/5/22"
    },
    {

        id: 3,
        description: "house cleaning",
        category: "cleaning",
        due_date: "1/4/22"
    },
]

app.get('/task', (req, res) => {

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

  
});
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
})
app.listen(port, function (err) {
    if (err) {
        console.log('error in running server');

    }
    console.log('Server is up and running on port:', port);
});