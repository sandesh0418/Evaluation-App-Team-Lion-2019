const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../models/User");

const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      config.query("SELECT * from users WHERE email = ?", [jwt_payload.email],function(error,results,field){
        if(error){
          
          console.log(error);
        }
        else{
        if(results.length>0){
          return done(null, jwt_payload.email);

         

        }
        else{
          return done(null, false);
        }
      }
      })
     
    })
  );
};
