var express = require('express');
var router = express.Router();
const taskContoller = require('../controllers/task_controller');
const createController = require('../controllers/create_controller');
const deleteController = require('../controllers/delete_controller');

console.log('Router loaded');

router.get('/list',taskContoller.list);

router.get('/create',createController.create);

router.get('/delete',deleteController.delete);

router.get('/sign-up',taskContoller.signUp);
router.get('/sign-in',taskContoller.signIn);


module.exports = router;