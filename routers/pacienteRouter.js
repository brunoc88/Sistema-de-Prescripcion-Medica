const express = require('express');
const pacienteController = require('../controllers/pacienteController.js');
const routePaciente = express.Router();

routePaciente.get('/index',pacienteController.getPacienteIndex);

routePaciente.post('/alta',pacienteController.altaPaciente);

routePaciente.patch('/baja/:idPaciente',pacienteController.bajaPaciente);

module.exports = routePaciente;