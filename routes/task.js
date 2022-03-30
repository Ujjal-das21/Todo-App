var express = require('express');
var router = express.Router();
const passport = require('passport');
const taskContoller = require('../controllers/task_controller');
const createController = require('../controllers/create_controller');
const deleteController = require('../controllers/delete_controller');
const { redirect } = require('express/lib/response');

console.log('Router loaded');

router.get('/list',passport.checkAuthentication,taskContoller.list);

router.get('/create',createController.create);

router.get('/delete',deleteController.delete);

router.get('/sign-up',taskContoller.signUp);
router.get('/sign-in',taskContoller.signIn);
router.get('/sign-out',taskContoller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//taskcontroller is to be corrected
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/task/sign-in'}),taskContoller.signIn);


module.exports = router;