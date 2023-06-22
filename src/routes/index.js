const { Router } = require('express');

const usersRouter = require('./users.routes'); // grupo de rotas do usuario
const notesRouter = require('./notes.routes'); // grupo de rotas de notas
const tagsRouter = require('./tags.routes'); // grupo de rotas de tags
const sessionsRouter = require('./sessions.routes'); // grupo de rotas para sessões

const routes = Router();

routes.use('/users', usersRouter); //ao acessar /users será redirecinado para usersRouter
routes.use('/sessions', sessionsRouter); //ao acessar /sessions será redirecinado para sessionsRouter
routes.use('/notes', notesRouter); //ao acessar /notes será redirecinado para usersRouter
routes.use('/tags', tagsRouter); //ao acessar /notes será redirecinado para tagsRouter

module.exports = routes;