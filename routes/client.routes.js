const { Router } = require("express");
const router = Router();
const clientController = require('../controllers/client.controller');
router.get('/profile',clientController.renderProfile);
module.exports = router;
