
const { Router } = require('express');

const TagsController = require('../controllers/TagsController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated'); //midleware de autenticação

const tagsRoutes = Router();


const tagsController = new TagsController();

tagsRoutes.get('/', ensureAuthenticated, tagsController.index);


module.exports = tagsRoutes;
