//Modules
const express = require('express');
const dotenv = require('dotenv');
const app = express();

//ENV
dotenv.config();

//Errors
const errors = require('../../network/errors');
const { logErrors, errorHandler } = require('../../utils/errors')

//Config
const config = require('../../config.js');

//Networks
const post = require('./components/post/network');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use('/api/post', post);

//Errors middleware
app.use(errors);
app.use(logErrors);
app.use(errorHandler)

app.listen(config.post_service.port, () => {
    console.log(`Service of POST listening in the port ${config.post_service.port}`);
})