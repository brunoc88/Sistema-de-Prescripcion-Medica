const express = require('express');
const medicamentoController = require('../controllers/medicamentoController');
const medicamentoRouter = express.Router();

medicamentoRouter.get('/info',medicamentoController.getInfo);
//GET vista Alta Medicamento
medicamentoRouter.get('/crear',medicamentoController.vistaAltaMedicamento);
//POST alta Medicamento
medicamentoRouter.post('/alta',medicamentoController.altaMedicamento);

module.exports = medicamentoRouter;