const express = require('express');
const contratoController = require('../controllers/contratoController');
const contratoRouter = express.Router();

//GET vista index Contrato
contratoRouter.get('/index',contratoController.vistaIndexContrato);

//GET vista Alta Contrato
contratoRouter.get('/crear',contratoController.vistaAltaContrato);

//POST alta de contrato
contratoRouter.post('/alta',contratoController.altaContrato);

module.exports = contratoRouter;