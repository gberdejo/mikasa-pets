const { Router } = require('express');
const router = Router();

const { homePag, createClient, loginPag, registerPag, redirectionPag, exitSession, loginSession } = require('../controllers');

router.get('/', homePag);
router.post('/clients', createClient);
router.get('/login', loginPag);
router.get('/register', registerPag);

router.get('/exit', exitSession);
router.get('*', redirectionPag);
router.post('/session', loginSession);
module.exports = router;