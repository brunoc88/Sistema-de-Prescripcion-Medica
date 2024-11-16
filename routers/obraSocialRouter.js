const express = require('express');
const obraSocialController = require('../controllers/obraSocialController');
const routerObra = express.Router();

routerObra.post('/alta',obraSocialController.altaObraSocial)

routerObra.patch('/baja/:id',obraSocialController.bajarObraSocial)



module.exports = routerObra;