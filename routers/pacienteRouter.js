const express = require('express');
const pacienteController = require('../controllers/pacienteController.js');
const routePaciente = express.Router();

//GET del Index Paciente
routePaciente.get('/index',pacienteController.getPacienteIndex);
//GET formulario para crear de Paciente
routePaciente.get('/crear',pacienteController.formCrearPaciente);
//POST formulario de Enviar un nuevo Paciente
routePaciente.post('/alta',pacienteController.altaPaciente);
//GET formulario para Actualizar paciente
routePaciente.get('/editar/:id',pacienteController.formEditarPaciente);
//PUT para Enviar Paciente Actualizado
routePaciente.put('/actualizar/:id',pacienteController.ActualizarPaciente);

routePaciente.patch('/baja/:id',pacienteController.bajaPaciente);

routePaciente.patch('/activar/:id',pacienteController.reactivarPaciente);



module.exports = routePaciente;