const { hash } = require('bcryptjs'); // funcao que vai gerar a criptografia
const AppError = require('../utils/AppError');

class UserCreateService{
  constructor(userRepository){
    this.userRepository = userRepository;
  }

  async execute({name, email, password}){

        const  checkUserExists= await this.userRepository.findByEmail(email);

        if(checkUserExists){
            throw new AppError('Este email já está em uso!');
        }

        const hashedPassword = await hash(password, 8); //passar senha e o fator de complexidade

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
  }

}

module.exports = UserCreateService;