require('dotenv').config();
const App = require('./app');
const newServer = new App();
newServer.startServer();

module.exports = newServer.getApp();