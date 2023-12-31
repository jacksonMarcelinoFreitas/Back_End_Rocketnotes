const { hash, compare } = require('bcryptjs'); // funcao que vai gerar a criptografia

const AppError = require('../utils/AppError')

const sqliteConnection = require("../database/sqlite")

const knex = require("../database/knex");

const UserRepository = require('../repositories/UserRepository');

const UserCreateService = require('../services/UserCreateService');


/*
    no máximo um controller tem 5 métodos

    - index - GET para listar varios registros
    - show - GET para exibir um registro especifico
    - create - POST para criar um registo
    - update - PUT para atualizar um registro
    - delete - DELETE para remover um registro
*/
class UsersController {

    async create(request, response){
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        //ingeção de dependencia - inversão de
        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.execute({name, email, password})

        return response.status(201).json();
    }

    async update(request,response){
        const { name, email, password, old_password } = request.body;
        // const { id } = request.params; - não se faz mais necessário
        const  user_id  = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);

        if(!user){
            throw new AppError('Usuário não encontrado!');
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este email já está em uso.")
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Voce precisa informar a senha antiga para definir a nova senha")
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8);
        }

        await database.run(
            `
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?
            `,
            [user.name, user.email, user.password, user_id])

        return response.status(200).json();
    }

    async show(request, response){
        const { id }  = request.params;
        const user = await knex('users')
        .where({ id })
        .first();

        return response.json(user)
    }

}

module.exports = UsersController;