const express = require('express');
const pacienteController = require('../controllers/pacienteController.js');
const routePaciente = express.Router();

routePaciente.post('/alta',pacienteController.altaPaciente);

module.exports = routePaciente;