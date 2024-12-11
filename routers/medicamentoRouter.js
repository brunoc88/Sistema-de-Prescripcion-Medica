const express = require('express');
const medicamentoController = require('../controllers/medicamentoController');
const medicamentoRouter = express.Router();


//GET vista index Medicamentos
medicamentoRouter.get('/index',medicamentoController.vistaIndexMedicamentos);
//GET vista Alta Medicamento
medicamentoRouter.get('/crear',medicamentoController.vistaAltaMedicamento);
//POST alta Medicamento
medicamentoRouter.post('/alta',medicamentoController.altaMedicamento);
//GET vista editar Medicamento
medicamentoRouter.get('/editar/:id',medicamentoController.vistaEditarMedicamento)
//PUT actualizar Medicamento 
medicamentoRouter.put('/actualizar/:id',medicamentoController.actualizarMedicamento);
//PATCH descativar Medicamento
medicamentoRouter.patch('/bajar/:id',medicamentoController.desactivarMedicamento);
//PATCH activar Medicamento
medicamentoRouter.patch('/activar/:id',medicamentoController.activarMedicamento);

module.exports = medicamentoRouter;