var express = require('express');
var router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');

router.get('/',homeController.home);
router.use('/task',require('./task'));

router.use('/api',require('./api'));

//export this router to use in our index.js
module.exports = router;