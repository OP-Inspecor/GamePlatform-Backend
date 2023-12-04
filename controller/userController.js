const userService = require("../services/userService");
const User = require("../models/User");
const HttpError = require("../errors/errorHandler");

const register = async (req, res, next) => {
  try {
    const user = await userService.register({ ...req.body });
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userService.login({ ...req.body });
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 34 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  await userService.logut(refreshToken);
  res.status(204).json();
};

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.user;
    const { path: tempDirectory, originalname } = req.file;
    const fileName = `${id}_${originalname}`;

    const destinationFile = path.join(avatarDir, fileName);

    await modifier(tempDirectory);

    await fs.rename(tempDirectory, destinationFile);

    const avatarUrl = `avatars/${fileName}`;
    await User.findByIdAndUpdate(id, { avatarUrl });

    res.json({ avatarUrl: `avatars/${fileName}` });
  } catch (error) {
    console.log(error.message);
    next(HttpError(500, error.message));
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) { }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const user = await userService.getMe(id);
    return res.status(200).json(user);
  } catch (error) {
    next(HttpError(500, error.message));
    console.log("GET_USER CONTROLLER", error.message);
  }
};

module.exports = { getUser, register, login, logout, uploadAvatar, refresh };
