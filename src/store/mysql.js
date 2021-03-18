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

function query(table, query, join, multiple) {

    let joinQuery = '';

    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        //Esta es una concatenación de la consulta principal con una nueva de la tabla de usuario
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result) => {
            if (err) return reject(err)

            let output;

            if (result.length > 0) {
                if (multiple) {
                    output = {...result };
                } else {
                    output = {...result[0] };
                }
            } else {
                output = result;
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

function remove(table, firstCondition, othersCondition = []) {
    let andConditions = "";
    if (othersCondition.length > 0) {
        andConditions = othersCondition.map(c => "AND ?").join(" ");
    }

    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM ${table} WHERE ? ${andConditions}`, [firstCondition, ...othersCondition], (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            }
        );
    });
}

module.exports = {
    list,
    get,
    upsert,
    query,
    remove
}