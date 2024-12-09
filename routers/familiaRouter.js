const express = require('express');
const familiaController = require('../controllers/familiaController');
const familiaRouter = express.Router();

//GET de vista index Familia y a la vez la vista de altas
familiaRouter.get('/index',familiaController.vistaIndexFamilia);
//POST de Familia
familiaRouter.post('/alta',familiaController.altaFamilia);
//GET vista de Editar Familia
familiaRouter.get('/editar/:id',familiaController.vistaEditarFamilia);
//PATCH editar Familia
familiaRouter.patch('/actualizar/:id',familiaController.editarFamilia);
//PATCH desactivar Familia
familiaRouter.patch('/bajar/:id',familiaController.desactivarFamilia);
//PATCH reactivar Familia
familiaRouter.patch('/activar/:id',familiaController.activarFamilia);

module.exports = familiaRouter;