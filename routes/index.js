const { Router } = require('express');
const router = Router();

const { homePag, createClient, loginPag, registerPag, redirectionPag, exitSession, loginSession } = require('../controllers');
const { validationHome, existsSession } = require('../middlewares');

router.get('/', [
    existsSession
], homePag);
router.post('/clients', createClient);
router.get('/login', [
    existsSession
], loginPag);
router.get('/register', [
    existsSession
], registerPag);

router.get('/exit', exitSession);
router.get('*', [
    existsSession
], redirectionPag);
router.post('/session', loginSession);

module.exports = router;