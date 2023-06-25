
const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated'); //midleware de autenticação
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER); //inicializando multer e passando configurações


const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update); //para mais de um registro
usersRoutes.get('/:id', usersController.show);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), (request, response) => {
    console.log(request.file.filename);
    response.json();
} ); //para um registro especifico


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