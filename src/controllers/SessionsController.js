const authConfig = require('../configs/auth');
const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class SessionsController{
  async create(request, response){
    const {email, password} = request.body;

    //fazendo o select no banco
    const user = await knex('users').where({ email }).first()

    if(!user){
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret,{
      subject: String(user.id),
      expiresIn
    })

    //o return é importante para garantir a parada da execução;
    return response.json({user, token});
  }
}

module.exports = SessionsController;