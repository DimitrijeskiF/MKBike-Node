const JtwStrategy = require('passport-jwt').Strategy;
const ExtractJtw = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


const options = {
    jwtFromRequest: ExtractJtw.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const strategy = new JtwStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
})

module.exports = (passport) => {
    passport.use(strategy)
}