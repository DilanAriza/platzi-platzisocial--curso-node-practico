//Libs
const mysql = require('mysql');

//Modules
const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error(`[DB ERROR] - [SERVER] - ${err}`);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB CONNECTED')
        }
    })

    connection.on(('error'), err => {
        console.error(`[DB ERROR] - [SERVER] - ${err}`);

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}


function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    console.log(data)
    console.log('insert')
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

function update(table, data) {
    console.log(data)
    console.log('update')
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
            if (err) return reject(err)

            let output;
            if (result.length > 0) {
                output = {...result[0] };
            } else {
                output = result[0];
            }

            resolve(output || null);
        })
    })
}

const upsert = async(table, data) => new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, result) => {
        if (err) return reject(err)
        resolve(result)
    })
})


module.exports = {
    list,
    get,
    upsert,
    query
}