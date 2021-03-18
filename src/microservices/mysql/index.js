//Libs
const express = require('express');
const dotenv = require('dotenv');
const app = express();

//ENV
dotenv.config();

//Config
const config = require('../../config');

//Router
const router = require('./network');

//Middlewares and config server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', router)

app.listen(config.mysql_service.port, () => {
    console.log(`Service of MySql listening in port ${config.mysql_service.port}`)
});