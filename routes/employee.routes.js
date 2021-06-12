const { Router } = require("express");
const router = Router();
const employeeController = require("../controllers/employee.controller");
const { isAuthenticated } = require("../helpers");

//router.get("/profile-employee", employeeController.renderProfileEmployee);
router.get("/citas-atender", employeeController.renderAtenderCitas);
router.get("/consultoria-vet/:id", employeeController.renderConsultoriaVet);
module.exports = router;
