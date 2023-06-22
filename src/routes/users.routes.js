
const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
// const ensureAuthenticated = require('../middlewares/ensureAuthenticated') //midleware de autenticação

const usersRoutes = Router();


const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', usersController.update);

module.exports = usersRoutes;

/*
    - Com o middleware eh possivel acessar tanto a requisicao a resposta e o destino
    - a funcao next() redireciona o para a proxima execucao;

    - pode ser aplicado a uma rota por vez
        - Rota: userRoutes.post("/",myMiddleware, usersController.create);
    - pode ser aplicado a todas as rotas de uma vez
        - userRoutes.use(myMiddleware);
*/