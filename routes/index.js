const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const clientController = require('../controllers/client.controller');
const pageController = require('../controllers/pages.controller');
const mid = require('../middlewares');
const petController = require('../controllers/pet.controller');
const sessionController = require('../controllers/session.controller');
//pages
router.get('/', [
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
], petController.listPet);
router.get('/home-client',[], pageController.homeClient);
//model data
router.post('/pets', petController.createPet);
//router.get('/pets',petController.listPet);
router.post('/clients', clientController.createUser);
router.post('/session', sessionController.loginSession);
router.get('/exit', sessionController.exitSession);

router.get('/products',)
//sin ruta
/*router.get('*', [
], pageController.redirectionHome);*/
module.exports = router;