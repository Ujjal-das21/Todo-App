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
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);

const Task = require('./models/Task');
const User = require('./models/User');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//mongoStore is used to store the session cookie in the DB
app.use(session({
    name: 'todo',
    secret:'ujjaldas',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store:new MongoStore({
       
            mongooseConnection: db,
            autoRemove:'disabled'
        
    },
    function(err){
        console.log(err|| 'connect-mongodb setup ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(expressLayouts);
app.use('/',require('./routes'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/',require('./routes/index'));
app.get('/delete-task/', (req, res) => {
   
    console.log(req.query);
    let id = req.query.id;
    Task.findOneAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database',id);
            return;
        }
        return res.redirect('back');
    })
    

});
app.post('/create-task', function(req, res){
    console.log(req.body);

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
app.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/task/sign-in'},

) ,function(req,res){

    return res.redirect('/task/list');

});
app.listen(port, function (err) {
    if (err) {
        console.log('error in running server');

    }
    console.log('Server is up and running on port:', port);
});