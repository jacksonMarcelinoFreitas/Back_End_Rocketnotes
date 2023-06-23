const { verify } = require("jsonwebtoken");
const appError = require("../utils/AppError");
const authCongfig = require("../utils/");

function ensureAuthentication(request, response, next){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT Token Inválido', 401);
  }

  const [] = authHeader.split()
}


