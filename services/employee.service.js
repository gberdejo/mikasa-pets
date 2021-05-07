const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const employeeService = {};

employeeService.getEmployeebyEmail = async(email) => {
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
employeeService.getEmployeebyId = async(id) => {
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
employeeService.createEmployee = async(obj) => {
    try {
        const employee = Employee.build(obj);
        if (!(employee instanceof Employee)) return null;
        const salt = await bcrypt.genSalt(10);
        employee.password = await bcrypt.hash(obj.password, salt);
        await employee.save();
        return employee;
    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = employeeService;