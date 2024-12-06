const express = require('express');
const profesionRoute = express();
const profesionController = require('../controllers/profesionController');

//GET vista Index Profesion
profesionRoute.get('/index',profesionController.indexProfesion);
//POST crar Profesion
profesionRoute.post('/alta',profesionController.altaProfesion);
//PATCH desactivar Profesion
profesionRoute.patch('/baja/:idProfesion',profesionController.bajaProfesion);
//GET vista Formulario Editar Profesion
profesionRoute.get('/editar/:id',profesionController.editarProfesion);
//PATCH actualizar Profesion
profesionRoute.patch('/actualizar/:id',profesionController.actualizarProfesion);
//PATCH reactivar Profesion
profesionRoute.patch('/activar/:id',profesionController.reactivarProfesion);

module.exports = profesionRoute;

