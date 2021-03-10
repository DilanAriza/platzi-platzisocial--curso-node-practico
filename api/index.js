//Modules
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const dotenv = require('dotenv');
const app = express();

//ENV
dotenv.config();

//Errors
const errors = require('../network/errors');
const { logErrors, errorHandler } = require('../utils/errors')

//Config
const config = require('../config.js');

//Networks
const user = require('./components/user/network');
const auth = require('./components/auth/network');

//Docs
const swaggerDoc = require('./swagger.json');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Errors middleware
app.use(errors);
app.use(logErrors);
app.use(errorHandler)

app.listen(config.api.port, () => {
    console.log(`Api listening in the port ${config.api.port}`);
})