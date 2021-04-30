const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const clientController = require('../controllers/client.controller');
const pageController = require('../controllers/pages.controller');
const mid = require('../middlewares');

//pages
router.get('/', [
    mid.existsSession
], pageController.home);
router.get('/login', [
    mid.existsSession
], pageController.login);
router.get('/register', [
    mid.existsSession
], pageController.register);
router.get('/register-pet', [
    mid.existsSessionModePet
], pageController.registerPet);
router.get('/list-pet', [
    mid.existsSessionModePetList
], pageController.listPet);
//model data
router.post('/pets', createPet);
router.post('/clients', clientController.createUser);
router.post('/session', loginSession);
router.get('/exit', exitSession);


//sin ruta
router.get('*', [
    mid.existsSession
], pageController.redirectionHome);
module.exports = router;