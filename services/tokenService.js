const jwt = require('jsonwebtoken');
const tokenModel = require('../models/Token')

class TokenService{

    createTokens(user){
        const accessToken = jwt.sign(user, process.env.TOKEN_ACCESS_KEY,{expiresIn:'30d'});
        const refreshToken = jwt.sign(user, process.env.TOKEN_REFRESH_KEY,{expiresIn:'30d'});
        return {accessToken,refreshToken};
    }

    async pushToken (userId,refreshToken){
        console.log(userId)
        const tokenDB = await tokenModel.findOne({user:userId});
        if(tokenDB){
            tokenDB.refreshToken = refreshToken;
            return tokenDB.save();
        }

        const token = await tokenModel.create({user:userId,refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        const tokenInDB = await tokenModel.deleteOne({refreshToken});
        return tokenInDB;
    }

    isValidAccessToken(token){
        try {
            console.log(process.env.TOKEN_ACCESS_KEY)
          const tokenData = jwt.verify(token,process.env.TOKEN_ACCESS_KEY);
          console.log("token valid",tokenData)
          return tokenData;
        } catch (error) {
            return null;
        }
        
        
    }

    isValidRefreshToken(token){
        try {
          const tokenData = jwt.verify(token,process.env.TOKEN_REFRESH_KEY);
          return tokenData;  
        } catch (error) {
            return null;
        }
        
    }

    async searchToken(refreshToken){
        const tokenInDB = await tokenModel.findOne({refreshToken});
        return tokenInDB;
    }
}

module.exports = new TokenService();