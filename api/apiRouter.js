const express = require('express');
const apiRouter = express.Router();
const apiController = require('./apiController');

//solo para crear tabla en mi base de datos y si necesito hacer una consulta con postman
apiRouter.get('/refeps/:id',apiController.obtenerRefeps);

module.exports = apiRouter;