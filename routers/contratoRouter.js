const express = require('express');
const contratoController = require('../controllers/contratoController');
const contratoRouter = express.Router();

//GET vista index Contrato
contratoRouter.get('/index',contratoController.vistaIndexContrato);

//GET vista Alta Contrato
contratoRouter.get('/crear',contratoController.vistaAltaContrato);

//POST alta de contrato
contratoRouter.post('/alta',contratoController.altaContrato);

//GET vista Editar Contrato
contratoRouter.get('/actualizar/:id',contratoController.vistaEditarContrato);

//PATCH editar fecha contrato(solo se puede reducirlo)
contratoRouter.patch('/editar/:id',contratoController.actualizarFechaContrato);

//PATCH de reactivar Contrato(NO SE PUEDE REACTIVAR CONTRATO UNA VEZ FINALIZADO)!
contratoRouter.patch('/activar/:id',contratoController.reactivarContrato);

//PATCH baja de Contrato
contratoRouter.patch('/baja/:id',contratoController.desactivarContrato);

//GET lista de contratos del profesional
contratoRouter.get('/historial/:id',contratoController.fichaContratoProfesional);

//GET descargar pdf del contrato
contratoRouter.get('/descargarPDF/:id',contratoController.descargarContratoPDF);

module.exports = contratoRouter;