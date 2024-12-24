const express = require('express');
const turnosController = require('../controllers/turnosController');
const turnoRouter = express.Router();

//vista Formulario para turnos
turnoRouter.get('/crear/:id',turnosController.vistaFormTurnos);

module.exports = turnoRouter;