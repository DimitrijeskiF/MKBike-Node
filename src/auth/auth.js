const passport = require('passport');
const localStrategy = require('passport-local');
const UserModel = require('../models/user');

const JtwStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log('id: '+ id);
  return UserModel.findOne(_id)
    .then((user) => {
      done(null, user)
      return null;
    }).catch((err) => {
      done(err)
    })

  // UserModel.findById(id, function(err, user){
  //   done(err, user)
  // })
});


passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          error = new Error('User not found')
          return done(null, false, error);
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )

);




// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter(process.env.SECRET)
//     },
//     async (user, done) => {
//       try {
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // secretOrKey: '1234mkbikes5678'
  secretOrKey: process.env.JWT_SECRET
}

const strategy = new JtwStrategy(options, (payload, done) => {
  UserModel.findOne({ _id: payload.user._id })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false)
      }
    }).catch((err) => {
      done(err, null);
    });
})


module.exports = (passport) => {
  passport.use(strategy);
}


