const express = require('express');
const router = express.Router();

const { homePag }= require('../controllers');

router.get('/', homePag);


module.exports = router;


