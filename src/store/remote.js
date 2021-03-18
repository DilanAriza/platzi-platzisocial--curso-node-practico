const request = require('request')

let urlRemote

//Request principal function
function req(method, table, data = null) {

    let body;
    let url = `${urlRemote}/${table}`;

    if (data && method === 'GET') {
        url += `/${data}`;
    } else if (data) {
        body = JSON.stringify(data)
    }

    return new Promise((resolve, reject) => {
        request({
            method,
            headers: {
                'content-type': 'application/json'
            },
            url,
            body
        }, (err, req, body) => {
            if (err) {
                console.error(`Error with the remote db: ${err}`);
                return reject(err.message);
            }

            const resp = JSON.parse(body);

            return resolve(resp.body)
        })
    })
}

function insert(table, data) {
    return req('POST', table, data);
}

function update(table, data) {
    return req('PUT', table, data);
}

module.exports = class createRemoteDB {
    constructor(host, port) {
        urlRemote = `http://${host}:${port}`;
        console.log(host, port)
    }

    list(table) {
        return req('GET', table);
    }

    get(table, id) {
        return req('GET', table, id);
    }

    upsert(table, data) {
        (data.id) ? update(table, data): insert(table, data)
    }
}