const db = {
    'user': [
        { id: '1', name: 'Dilan' },
    ],
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = []
    }

    db[table].push(data)

    console.log(db)
}

async function query(table, q) {
    let col = await list(table);

    let keys = Object.keys(q);
    let key = keys[0];

    return col.filter(item => item[keys] === q[key])[0] || null;
}

async function remove(table, id) {
    // return new Promise(resolve, reject) 
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}