const { response, request } = require('express');

const employeeController = {};
employeeController.renderProfileEmployee = (req, res) => {
    res.render('profile_employee');
}

module.exports = employeeController;