const auth = require('../../../../auth');

module.exports = function chechAuth(action) {

    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                const owner = req.body.id;
                auth.check.own(req, owner)
                next();
                break;

            case 'create':
                auth.check.logged(req)
                next();
                break;

            case 'delete':
                auth.check.logged(req)
                next();
                break;

            case 'like':
                auth.check.logged(req)
                next();
                break;

            case 'unLiked':
                auth.check.logged(req)
                next();
                break;

            case 'list':
                auth.check.logged(req)
                next();
                break;

            default:
                next();
                break;
        }
    }

    return middleware;

}