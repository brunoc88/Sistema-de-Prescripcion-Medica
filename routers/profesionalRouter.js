const express = require('express');
const profesionalController = require('../controllers/profesionalController');
const profesionalRouter = express.Router();

profesionalRouter.get('/index',profesionalController.indexProfesional);

profesionalRouter.get('/crear',profesionalController.vistaAltaProfesional);

profesionalRouter.post('/alta',profesionalController.altaProfesional);

module.exports = profesionalRouter;