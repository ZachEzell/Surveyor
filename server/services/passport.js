const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
// want to use a strategy through passport
// when users grant permission, reroute to /auth/google/callback

// Serialize the user
// This confirms that a user has already logged in
// and sets a cookie for that user
passport.serializeUser((user, done) => {
  // done is callback, after some work in passport
  // user.id identifies users in follow-up requests
  // user.id refers to the mongodb database id
  // this creates a unique ID on the mongo side of things
  // once we initially sign in through google, we no longer
  // care about the google token, just our own internal IDs

  // user here is a mongo model that was turned into an ID

  // user.id is the MongoDB database id, not the id
  // we just created (profile.id)
  // we do this because of multiple authentication
  // services (facebook, etc.) do not have the same
  // id we pulled from google
  done(null, user.id);
});

// Turn serialized cookie back into a model?
// the id is the user.id we stuffed into the cookie
// when we serialized the user
// find the user model by the id and then call done
// at the end of this, user model is added to req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Part of Set-up, sets strategy for dealing with authentication
// Step one, set up the desired strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // This stuff happens after the callback
    // the accessToken is the code
    // contains information about the uri
    async (accessToken, refreshToken, profile, done) => {
      // whenever reaching out to database, it is async
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // First argument is a error object. null indicates
        // everything has gone well
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
