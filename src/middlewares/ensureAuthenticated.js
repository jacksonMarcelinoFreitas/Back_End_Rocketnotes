const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthentication(request, response, next){
  const authHeader = request.headers.authorization; // aqui chega o auth com o bearer

  if(!authHeader){
    throw new AppError('JWT Token não informado', 401);
  }

  const [, token] = authHeader.split(' '); //não queremos o bearer, somente o token

  try{
    const { sub: user_id } = verify(token, authConfig.jwt.secret); //pega o id do usuario no token

    request.user = {
      id: Number(user_id),
    };

    return next();
  }catch{
    throw new AppError('JWT Token inválido', 401);
  }
}

module.exports = ensureAuthentication;
