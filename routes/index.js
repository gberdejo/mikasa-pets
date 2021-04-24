const { Router } = require('express');
const router = Router();

const { homePag, createClient, loginPag, registerPag, redirectionPag } = require('../controllers');

router.get('/', homePag);
router.post('/clients', createClient);
router.get('/login', loginPag);
router.get('/register', registerPag);

router.get('*', redirectionPag);

module.exports = router;