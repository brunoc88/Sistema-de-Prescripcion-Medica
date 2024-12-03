const express = require('express');
const homeController = require('../controllers/homeController');
const homeRouter = express.Router();

homeRouter.get('/',homeController.vistaLogin);

homeRouter.post('/login',homeController.login);

homeRouter.post('/logout',homeController.logout);

module.exports = homeRouter;