const express = require('express');
const profesionRoute = express();
const profesionController = require('../controllers/profesionController');

profesionRoute.get('/alta',profesionController.getForm)

profesionRoute.post('/alta',profesionController.altaProfesion);

profesionRoute.patch('/baja/:idProfesion',profesionController.bajaProfesion);

module.exports = profesionRoute;

