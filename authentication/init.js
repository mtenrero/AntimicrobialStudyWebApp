const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');

var users = require('./userfile.json')

function findUser(username, callback) {
    console.log(users);
    for (var usr in users) {
        if (username === users[usr].username) {
            return callback(null, users[usr]);
        }
    }
    return callback(null)
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username)
});

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
});

function initPassport() {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            findUser(username, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                if (password !== user.password) {
                    return done(null, false)
                }
                return done(null, user)
            })
        }
    ))

    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport;
