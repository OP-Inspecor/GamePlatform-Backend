const Game = require("../models/Game");

const create = async (body, user) => {
  try {
    const game = await Game.create({
      ...body,
      creator: user,
    });
    return game || null;
  } catch (error) {
    console.log("CREATE GAME SERVICE", error.message);
  }
};

const getAllGamesAdmin = async () => {
  try {
    const games = await Game.find();
    return games || null;
  } catch (error) {
    console.log("GET_ALL GAME SERVICE", error.message);
  }
};

const getAllGames = async () => {
  try {
    const games = await Game.find({status:'approved'});
    return games || null;
  } catch (error) {
    console.log("GET_ALL GAME SERVICE", error.message);
  }
};

const getById = async (gameId) => {
  try {
    const game = await Game.findById(gameId);
    return game || null;
  } catch (error) {
    console.log("GET_BY_ID GAME SERVICE", error.message);
  }
};

const update = async (body, id) => {
  try {
    const updatedVacancy = await Game.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return updatedVacancy || null;
  } catch (error) {
    console.log("UPDATE GAME SERVICE", error.message);
  }
};

const deleteGame = async (userId, id) => {
  try {
    const deletedVacancy = await Game.findOneAndRemove({
      _id: id,
      creator: userId,
    });
    return deletedVacancy || null;
  } catch (error) {
    console.log("DELETE GAME SERVICE", error.message);
  }
};

const likeGame = async (id) => {
  try {
    const result = await Game.findByIdAndUpdate(
      id,
      {
        $inc: { likes: 1 },
      },
      { new: true }
    );
    return result || null;
  } catch (error) {
    console.log("LIKE_GAME GAME SERVICE", error.message);
  }
};

const getCreatorGames = async (user_id) => {
  try {
    console.log(user_id)
    const result = await Game.find({ creator: user_id });
    return result || null;
  } catch (error) {
    console.log("GET_CREATOR_GAMES GAME SERVICE", error.message);
  }
};

module.exports = {
  create,
  getAllGamesAdmin,
  getById,
  getCreatorGames,
  update,
  deleteGame,
  likeGame,
  getAllGames
};
