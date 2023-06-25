
const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated'); //midleware de autenticação

const usersRoutes = Router();


const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.get('/:id', usersController.show);


module.exports = usersRoutes;

/*
    - ao fazer put não se faz mais necessário passar o id do usuário, uma vez que este já está sendo pego ao passar pelo midleware via token;

    - Com o middleware eh possivel acessar tanto a requisicao a resposta e o destino
    - a funcao next() redireciona o para a proxima execucao;

    - pode ser aplicado a uma rota por vez
        - Rota: userRoutes.post("/",myMiddleware, usersController.create);
    - pode ser aplicado a todas as rotas de uma vez
        - userRoutes.use(myMiddleware);
*/