const Employee = require("../models/employee");

const employeeService = {};

employeeService.getEmployeebyEmail = async (email) => {
  try {
    const employee = await Employee.findOne({
      where: {
        email,
      },
    });
    if (employee) return employee.dataValues;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
employeeService.getEmployeebyId = async (id) => {
  try {
    const employee = await Employee.findOne({
      where: { id },
    });
    if (employee) return employee.dataValues;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = employeeService;
