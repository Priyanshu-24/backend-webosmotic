const express = require('express');
const multer = require('multer');
const verifyToken = require('./config/verifyToken');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const ContactController = require('./controllers/ContactController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();

routes.post('/user/register', UserController.createUser);
routes.post('/login', LoginController.store);
routes.post('/contact',verifyToken, ContactController.createContact);
routes.get('/user/contacts', verifyToken , DashboardController.getContactsByUserId);

module.exports = routes;
