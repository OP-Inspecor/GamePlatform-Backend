const HttpError = require("../errors/errorHandler");

const { getAllGames,create, getById, update, deleteGame } = require("../services/gameService");


const createGame = async (req, res, next) => {
    try {
        console.log(req.user)
        const {id} = req.user;
        const newGame = await create({...req.body},id);
        return res.status(200).json(newGame);
    } catch (error) {
        next(HttpError(500, error.message));
        console.log("CREATE GAME CONTROLLER", error.message);
    }
}

const getAll  = async (req, res, next) => {
    try {
        const games = await getAllGames();
        return res.status(200).json(games); 
    } catch (error) {
        next(HttpError(500, error.message));
        console.log("GET_ALL GAME CONTROLLER", error.message);
    }
}

const getGameById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const game = await getById(id);
        return res.status(200).json(game);
    } catch (error) {
        next(HttpError(500, error.message));
        console.log("GET_BY_ID GAME CONTROLLER", error.message);
    }
}

const updateGame = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await update({...req.body},id);
        return res.status(200).json(result);
    } catch (error) {
        next(HttpError(500, error.message));
        console.log("UPDATE GAME CONTROLLER", error.message);
    }
}

const deleteOneGame = async (req, res, next) => {
    try {
        const {id} = req.user;
        const result = await deleteGame(id,req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        next(HttpError(500, error.message));
        console.log("DELETE GAME CONTROLLER", error.message);
    }
}


module.exports = {createGame,deleteOneGame,updateGame,getGameById,getAll};