const User = require("../models/User");
const bcrypt = require("bcrypt");
const HttpError = require("../errors/errorHandler");
const uuid = require("uuid");
const UserDTO = require("../dtos/UserDTO");
const tokenService = require("./tokenService");

const register = async ({name, email, password}) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new HttpError(409, "User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role: "USER",
    });
    const userDTO = new UserDTO(newUser);
    const tokens = tokenService.createTokens({ ...userDTO });
  
    await tokenService.pushToken(userDTO.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDTO,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const login = async ({email, password}) => {
  const person = await User.findOne({ email });
  if (!person) {
    return null;
  }
  const hashPass = await bcrypt.compare(password, person.password);

  if (!hashPass) {
    return null;
  }

  const userDTO = new UserDTO(person);
  const tokens = tokenService.createTokens({ ...userDTO });
  await tokenService.pushToken(userDTO.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDTO,
  };
};

const logut = async (refreshToken) => {
    
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

const refresh = async (refreshToken) => {

  if (!refreshToken) {
    return HttpError(403, "Unathorized");
  }
  const tokenData = tokenService.isValidRefreshToken(refreshToken);
  const tokenFromDB = await tokenService.searchToken(refreshToken);
 
  if (!tokenData || !tokenFromDB) {
    return HttpError(403, "Unathorized");
  }
  const person = await User.findById(tokenData.id);
  const recruiterDTO = new UserDTO(person);
  
  const tokens = tokenService.createTokens({ ...recruiterDTO });
  return {
    accessToken: tokens.accessToken,
  };
};



module.exports = { register, login, logut, refresh };
