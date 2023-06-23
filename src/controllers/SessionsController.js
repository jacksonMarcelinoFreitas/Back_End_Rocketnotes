const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
const authConfig = require('../configs/auth');
const { sign } = require('jsonwebtoken');

class SessionsController{
  async create(request, response){
    const {email, password} = request.body;

    const user = await knex('users').where({ email }).first() //fazendo o select no banco

    if(!user){
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const passwordMatched = compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret,{
      subject: String(user.id),
      expiresIn
    })


    return response.json({user, token}); //importante para garantir a parada da execução;
  }
}

module.exports = SessionsController;