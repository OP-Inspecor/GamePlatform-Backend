const express = require('express');
const router = express.Router();
const {register,login,logout,uploadAvatar,refresh, getUser} = require('../controller/userController');
const auth = require('../middlewares/auth');



router.post('/register', register);

router.post('/login', login);

router.delete('/logut',auth, logout);

router.post('/refresh', refresh);

router.get('/me', auth, getUser )

router.post('/uploadAvatar',auth, uploadAvatar);


module.exports = router;