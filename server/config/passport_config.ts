import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import { User } from './../models/users/user';

export namespace PassportConfig {
  export function configure(passportInstance: passport.Passport): void {
    passportInstance.serializeUser((user: User, callback) => {
      callback(null, user.id);
    });

    passportInstance.deserializeUser((id: number, done) => {
      User.getById(id).then(user => {
        done(null, user);
      }).catch(error => {
        done(error);
      });
    });

    passportInstance.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, (email, password, done) => {
      User.signIn(email, password)
        .then(user => {
          done(null, user);
        }).catch(error => {
          done(null, false, { message: error });
        });
    }));

  }
}
