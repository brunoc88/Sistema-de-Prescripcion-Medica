const express = require('express');
const pacienteController = require('../controllers/pacienteController.js');
const routePaciente = express.Router();

routePaciente.get('/index',pacienteController.getPacienteIndex);

routePaciente.get('/crear',pacienteController.formCrearPaciente);

routePaciente.post('/alta',pacienteController.altaPaciente);

routePaciente.put('/editar/:id',pacienteController.formEditarPaciente);

routePaciente.patch('/baja/:id',pacienteController.bajaPaciente);

routePaciente.patch('/activar/:id',pacienteController.reactivarPaciente);



module.exports = routePaciente;