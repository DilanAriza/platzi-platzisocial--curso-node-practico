const express = require('express');

const config = require('../config.js');
const app = express();

const user = require('./components/user/network');

//Routers
app.use('/api/user', user)

app.listen(config.api.port, () => {
    console.log(`Api listening in the port ${config.api.port}`);
})