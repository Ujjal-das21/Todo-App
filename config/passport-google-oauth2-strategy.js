const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');

passport.use(new googleStrategy({
    clientID:"962696221118-58fib1llsuelgauki3dkimaov7p12ol4.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/task/auth/google/callback",

},
   function(accessToken,refreshToken,profile,done){
       User.findOne({email: profile.emails[0].value}).exec(function(err,user){
           if(err){
               console.log('error in google strategy passport',err); return ;
           }
           console.log('profile');
           if(user){
               return done(null,user);

           }else{
               User.create({
                   name:profile.displayName,
                   email:profile.emails[0].value,
                   password:crypto.randomBytes(20).toString('hex')
                    
               },function(err,user){
                if(err){
                    console.log('error in google strategy passport',err); return ;
                }
                return done(null,user);
               });

           }
       })
   }

));

module.exports = passport;