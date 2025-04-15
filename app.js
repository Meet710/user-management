require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const DatabaseConfig = require('./config/database')
const UserRoutes = require('./routes/user')
const DB_URI = process.env.DB_URI

class Server {
    constructor() {
        this.app = express(),
        this.initializeDbConnection(),
        this.initializeApp()
    }

    initializeDbConnection() {
      new DatabaseConfig(DB_URI).connectDB();
    }

    initializeApp() {
        this.initializeMiddlewares()
        this.initializeRoutes()
      }

    initializeMiddlewares() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
    }

    initializeRoutes() {
         new UserRoutes(this.app);
    }
    startServer() {
        this.app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on port ${process.env.PORT || 5000}`)
        })
    }
    getApp() {
        return this.app;
 }
}
module.exports = Server;