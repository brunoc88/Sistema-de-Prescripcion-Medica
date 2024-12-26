const express = require('express');
const pacienteController = require('../controllers/pacienteController.js');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const routePaciente = express.Router();

//GET del Index Paciente
routePaciente.get('/index',verifyToken, verifyRole('admin'),pacienteController.getPacienteIndex);
//GET formulario para crear de Paciente
routePaciente.get('/crear',verifyToken, verifyRole('admin'),pacienteController.formCrearPaciente);
//POST formulario de Enviar un nuevo Paciente
routePaciente.post('/alta',verifyToken, verifyRole('admin'),pacienteController.altaPaciente);
//GET formulario para Actualizar paciente
routePaciente.get('/editar/:id',verifyToken, verifyRole('admin'),pacienteController.formEditarPaciente);
//PUT para Enviar Paciente Actualizado
routePaciente.put('/actualizar/:id',verifyToken, verifyRole('admin'),pacienteController.ActualizarPaciente);
//PATCH desactivar Paciente
routePaciente.patch('/baja/:id',verifyToken, verifyRole('admin'),pacienteController.bajaPaciente);
//PATCH reactivar Paciente
routePaciente.patch('/activar/:id',verifyToken, verifyRole('admin'),pacienteController.reactivarPaciente);
//GET historial de Turnos del Paciente
routePaciente.get('/turnos/:id',verifyToken, verifyRole('admin'),pacienteController.historialTurnos);

module.exports = routePaciente;