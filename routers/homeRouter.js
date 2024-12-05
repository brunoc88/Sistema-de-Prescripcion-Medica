const express = require('express');
const homeController = require('../controllers/homeController');
const homeRouter = express.Router();

homeRouter.get('/index',homeController.vistaIndexHome);

homeRouter.get('/login',homeController.vistaLogin);

homeRouter.post('/login',homeController.login);

homeRouter.get('/logout',homeController.logout);

module.exports = homeRouter;