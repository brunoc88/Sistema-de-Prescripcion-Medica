const express = require('express');
const formaController = require('../controllers/formaController');
const formaRouter = express.Router();


//GET vista index Forma y alta de la misma
formaRouter.get('/index',formaController.vistaIndexForma);

//POST alta de Forma
formaRouter.post('/alta',formaController.altaForma);

//GET vista Editar Forma
formaRouter.get('/editar/:id',formaController.vistaEditarForma);

//PATCH actualizar Forma
formaRouter.patch('/actualizar/:id',formaController.actualizarForma);

//PATCH descativar Forma
formaRouter.patch('/bajar/:id',formaController.desactivarForma);

//PATCH activar Forma
formaRouter.patch('/activar/:id',formaController.activarForma);


module.exports = formaRouter;