const express = require('express');
const obraSocialController = require('../controllers/obraSocialController');
const routerObra = express.Router();


routerObra.get('/alta',obraSocialController.crearObra);

routerObra.post('/alta',obraSocialController.altaObraSocial)

routerObra.patch('/baja/:id',obraSocialController.bajarObraSocial)



module.exports = routerObra;