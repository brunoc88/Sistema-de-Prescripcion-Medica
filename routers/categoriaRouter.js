const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const categoriaRouter = express.Router();

//GET de vista index Categoria y a la vez la vista de altas
categoriaRouter.get('/index',categoriaController.vistaIndexCategoria);
//POST de Categoria
categoriaRouter.post('/alta',categoriaController.altaCategoria);
//GET vista de Editar Categoria
categoriaRouter.get('/editar/:id',categoriaController.vistaEditarCategoria);
//PATCH editar Categoria
categoriaRouter.patch('/actualizar/:id',categoriaController.editarCategoria);
//PATCH desactivar Categoria
categoriaRouter.patch('/bajar/:id',categoriaController.desactivarCategoria);
//PATCH reactivar Categoria
categoriaRouter.patch('/activar/:id',categoriaController.activarCategoria);

module.exports = categoriaRouter;