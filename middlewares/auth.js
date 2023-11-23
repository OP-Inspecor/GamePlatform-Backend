const HttpError  = require("../errors/errorHandler");
const TokenService = require("../services/tokenService");


module.exports = function(req,res,next){
  try {
      const headerAuth = req.headers.authorization;
      
      if(!headerAuth){
          return next(HttpError(403,"Unath"));   
      }
      const accessToken = headerAuth.replace(/Bearer\s/,'');
      
      const userData = TokenService.isValidAccessToken(accessToken);
      console.log(userData)
      if(!userData){
        return next(HttpError(403,"Unath"));   
      }
      req.user = userData;
      next();
  } catch (error) {
    return next(HttpError(403,"Unath"));   
  }
}