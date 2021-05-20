const { Router } = require("express");
const router = Router();


const { isAuthenticated } = require('../helpers');

router.get('/profile-employee', employeeController.renderProfileEmployee);
module.exports = router;