const express = require('express');
const turnosController = require('../controllers/turnosController');
const turnoRouter = express.Router();

// GET vista Profesionales disponibles segun Obra Social
turnoRouter.get('/crear/:id',turnosController.vistaProfesionalesDisponibles);
// GET vista del Form Turno
turnoRouter.get('/validacion/:id',turnosController.vistaTurno);
// POST Alta de turno
turnoRouter.post('/alta',turnosController.altaTurno);
// PATCH bajar turno
turnoRouter.patch('/baja/:id',turnosController.bajarTurno);

module.exports = turnoRouter;