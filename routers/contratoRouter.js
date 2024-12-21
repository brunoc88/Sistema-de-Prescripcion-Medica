const express = require('express');
const contratoController = require('../controllers/contratoController');
const contratoRouter = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
//GET vista index Contrato
contratoRouter.get('/index',verifyToken, verifyRole('admin'),contratoController.vistaIndexContrato);

//GET vista Alta Contrato
contratoRouter.get('/crear',verifyToken, verifyRole('admin'),contratoController.vistaAltaContrato);

//POST alta de contrato
contratoRouter.post('/alta',verifyToken, verifyRole('admin'),contratoController.altaContrato);

//GET vista Editar Contrato
contratoRouter.get('/actualizar/:id',verifyToken, verifyRole('admin'),contratoController.vistaEditarContrato);

//PATCH editar fecha contrato(solo se puede reducirlo)
contratoRouter.patch('/editar/:id',verifyToken, verifyRole('admin'),contratoController.actualizarFechaContrato);

//PATCH de reactivar Contrato(NO SE PUEDE REACTIVAR CONTRATO UNA VEZ FINALIZADO)!
contratoRouter.patch('/activar/:id',verifyToken, verifyRole('admin'),contratoController.reactivarContrato);

//PATCH baja de Contrato
contratoRouter.patch('/baja/:id',verifyToken, verifyRole('admin'),contratoController.desactivarContrato);

//GET lista de contratos del profesional
contratoRouter.get('/historial/:id',verifyToken, verifyRole('admin'),contratoController.fichaContratoProfesional);

//GET descargar pdf del contrato
contratoRouter.get('/descargarPDF/:id',verifyToken, verifyRole('admin'),contratoController.descargarContratoPDF);

module.exports = contratoRouter;