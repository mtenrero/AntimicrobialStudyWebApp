function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.zip != null) {
            return next()
        }
        res.redirect('/login')
    }
}

module.exports = authenticationMiddleware;