const express = require('express');
const homeController = require('../controllers/homeController');
const {verifyRole,verifyToken} = require('../middlewares/authMiddleware');
const homeRouter = express.Router();


homeRouter.get('/login',homeController.vistaLogin);

homeRouter.post('/login',homeController.login);

homeRouter.get('/index',verifyToken,verifyRole('admin'),homeController.vistaIndexHome);

homeRouter.get('/logout',homeController.logout);

module.exports = homeRouter;