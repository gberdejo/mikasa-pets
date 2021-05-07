const employeeService = require("../services/employee.service");

const helper = {};

helper.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
};
helper.validationUser = async (email) => {
  let user = {};
  const validation = email.split("@");
  if (validation[1] === "mikasa.pet") {
    const employee = await employeeService.getEmployeebyEmail(email);

    if (employee.role_employee !== "VENDEDOR") {
    }
  } else {
    return {
      name: "carlos",
      role: "CLIENTE",
    };
  }
};

module.exports = helper;
