const NanoID = require('nanoid');
const auth = require('../auth')

const TABLE = 'user';
module.exports = function(injectedStore) {

    let store = injectedStore;

    if (!store) {
        store = require('../../../store/dummy')
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(data) {

        const user = {
            id: data.id ? data.id : NanoID.nanoid(),
            name: data.name,
            username: data.username
        };

        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password,
            })
        }

        return store.upsert(TABLE, user)
    }

    function follow(from, to) {
        return store.upsert(`${TABLE}_follow`, {
            user_from: from,
            user_to: to
        });
    }

    function unFollow(from, to) {
        return store.remove(`${TABLE}_follow`, { user_from: from }, [{ user_to: to }])
    }

    function followers(user) {
        const join = {};
        join[TABLE] = 'user_to'; //{user: 'user_to}

        const query = { user_from: user }

        return store.query(`${TABLE}_follow`, query, join)
    }

    return {
        list,
        get,
        upsert,
        follow,
        unFollow,
        followers,
    }
}