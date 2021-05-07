const passport = require("passport");
const bcrypt = require("bcryptjs");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const employeeService = require('../services/employee.service');

const authController = {};

authController.renderHome = async(req, res) => {
    const products = await productService.getlistProduct();
    res.render("home", { products });
};
authController.renderLogin = (req, res) => res.render("login");
authController.login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: {
        type: "error",
    },
    failureMessage: true,
});
authController.renderSignUp = (req, res) => res.render("signup");
authController.signUp = async(req, res) => {
    const {
        name,
        lastname,
        birthdata,
        direction,
        nick,
        phone,
        email,
        password,
    } = req.body;
    const clientExists = await clientService.getClientbyEmail(email);
    if (clientExists) {
        req.flash("error", "El Usuario ya existe");
        return res.redirect("/signup");
    }

    const client = await clientService.registerClient({
        name,
        lastname,
        birthdata,
        direction,
        nick,
        phone,
        email,
        password,
    });
    if (client) return res.redirect("/login");

    return res.redirect("/signup");
};
authController.renderSignUpAdmin = (req, res) => res.render('signup_admin');
authController.signUpAdmin = async(req, res) => {
    console.log(req.body);
    const { name, lastname, phone, email, password, role } = req.body;
    const obj = { name, lastname, phone, email, password, role };
    const employeeExists = await employeeService.getEmployeebyEmail(obj.email);
    if (employeeExists) {
        req.flash('error', 'El usuario ya existe');
        return res.redirect('/signup-admin');
    }
    const employee = await employeeService.createEmployee(obj);
    if (!employee) {
        req.flash('error', 'Ocurrio un error con los datos enviados');
        return res.redirect('/signup-admin');
    }
    res.json(employee);
}

authController.logout = (req, res) => {
    req.logout();
    res.redirect("/");
};

module.exports = authController;