const path = require('path');
const User = require('../models/user')
require('../db/database')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const secretOrKey = process.env.JWT_SECRET;
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;


module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._id)
             .then((user) => {
                 if(user) {
                     return done(null, user)
                 }
                 return done(null, false)
             })
             .catch((error) => {
                 console.log(error)
             })
    })
  )
}