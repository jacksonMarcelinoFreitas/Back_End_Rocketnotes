
const { Router } = require('express');

const NotesController = require('../controllers/NotesController');

const notesRoutes = Router();


// function myMiddleware(request, response, next){
//     console.log('Voce passou pelo mid');

//     if(!request.body.isAdmin){
//         return response.json({message: 'user unauthorized'});
//     };

//     next();
// }

const notesController = new NotesController();

notesRoutes.get('/', notesController.index);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);
// notesRoutes.put("/:id", notesController.update);

module.exports = notesRoutes;

/*
    - Com o middleware eh possivel acessar tanto a requisicao a resposta e o destino
    - a funcao next() redireciona o para a proxima execucao;

    - pode ser aplicado a uma rota por vez
        - Rota: userRoutes.post("/",myMiddleware, usersController.create);
    - pode ser aplicado a todas as rotas de uma vez
        - userRoutes.use(myMiddleware);
*/