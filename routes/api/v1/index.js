var express = require('express');
var router = express.Router();

router.use('/task',require('./list'));


module.exports = router;