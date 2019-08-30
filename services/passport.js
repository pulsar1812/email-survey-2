const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// For setting cookies, using MongoDB user ID
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// For getting user using cookies
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      // Check if the user exists
      if (existingUser) {
        return done(null, existingUser);
      }
      // If the user does not exist, create a new user and save it to the DB
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
