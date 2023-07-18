
const sqliteConnection = require("../database/sqlite");

class UserRepository{
  async findByEmail(email){
    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users where email = (?)', [email]);

     return user;
  }

  async create({name, email, password}){
    const database = await sqliteConnection();

    const userId = await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

    return { id: userId };
  }

}

module.exports = UserRepository;

//a camada repository está com a responsabiliddade de fazer a alteração no banco de dados, devendo conter nela a maneira que isso será feito.