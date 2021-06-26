const { Router } = require('express');
const router = Router();
const employeeController = require('../controllers/employee.controller');
const { isAuthenticated } = require('../helpers');

//router.get("/profile-employee", employeeController.renderProfileEmployee);
router.get('/citas-atender', employeeController.renderAtenderCitas);
router.get('/consultoria-vet/:id', employeeController.renderConsultoriaVet);
router.get(
  '/consultoria-vet-detalle/:id',
  employeeController.renderConsultoriaVetDetalle
);
router.post(
  '/registrar-historial',
  [isAuthenticated],
  employeeController.registrarHistorial
);
module.exports = router;
