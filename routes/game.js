const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createGame,getAll, updateGame, deleteOneGame, getGameById } = require('../controller/gameController');


router.get('/', getAll);

router.get('/:id',getGameById)

router.post('/',auth, createGame);

router.patch('/:id',auth, updateGame);

router.delete('/:id',auth, deleteOneGame);



module.exports = router;
