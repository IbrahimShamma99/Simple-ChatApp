const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../routes/models/User');
let opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = 'secret'


module.exports = (passport) => {
    passport.use(new JWTStrategy(opt,(payload,done) => {
        User.findById(payload.id)
            .then(user => {
                if(user) {
                   return done(null,user);
                } else {
                    return done(null,false);
                }
            })
            .catch(err => res.status(404).json(err))
    }))
}
