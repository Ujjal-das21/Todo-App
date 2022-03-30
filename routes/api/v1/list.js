var express = require('express');
var router = express.Router();
const listApi= require('../../../controllers/api/v1/list_api');
router.get('/',listApi.index);



module.exports = router;