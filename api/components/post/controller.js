//Libs
const NanoID = require('nanoid');

const TABLE = 'post'

module.exports = function(injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('./../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    function getByUser(user) {
        return store.query(TABLE, { user: user }, false, true);
    }

    function upsert(user, body, id) {
        const newPost = {
            id: id ? id : NanoID.nanoid(),
            user,
            text: body.text
        }

        return store.upsert(TABLE, newPost)
    }

    function remove(user, id) {
        return store.remove(`${TABLE}`, { id: id }, [{ user: user }])
    }

    return {
        list,
        upsert,
        get,
        getByUser,
        remove,
    }
}