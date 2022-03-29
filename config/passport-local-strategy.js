const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email',

},
function(email,password,done){
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }

        if(!user || user.password != password){
            console.log('Invalid username Password');
            return done(null, false);
        }
        return done(null, user);
      });

}

));

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user to decide which key is to be kept in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> passport ');
            return done(err);

        }
        return done(null,user);
    });
});

module.exports = passport;
