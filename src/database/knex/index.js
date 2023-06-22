const config = require('../../../knexfile');

const knex = require('knex')

//Cria a conexão
const connection = knex(config.development);

module.exports = connection;