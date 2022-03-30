const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
app.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/task/sign-in'},

) ,function(req,res){

    let

    return res.redirect('/task/list');

});