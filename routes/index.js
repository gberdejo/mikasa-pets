const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { listPetPag, registerPetPag, homePag, createClient, loginPag, registerPag, redirectionPag, exitSession, loginSession, createPet } = require('../controllers');
const { isEmailValid } = require('../helpers');
const { existsSessionModePetList, existsSession, checkValidation, existsSessionModePet } = require('../middlewares');

//pages
router.get('/', [
    existsSession
], homePag);
router.get('/login', [
    existsSession
], loginPag);
router.get('/register', [
    existsSession
], registerPag);
router.get('/register-pet', [
    existsSessionModePet
], registerPetPag);
router.get('/list-pet', [
    existsSessionModePetList
], listPetPag);
//model data
router.post('/pets', createPet);
router.post('/clients', createClient);
router.post('/session', loginSession);
router.get('/exit', exitSession);


//sin ruta
router.get('*', [
    existsSession
], redirectionPag);
module.exports = router;