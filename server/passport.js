const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { JWT_SECRET } = require('./configuration');
const config = require('./configuration');
const User = require('./models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    // Where the token is contained and where the secret is
    // passport will decode the token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET

}, async (payload, done) => {
    try {
    // Find user by id specified in token using payload.sub
    // (from controllers/users.js signToken())
    // Call done to exit the function
    const user = await User.findById(payload.sub)

    // If user doesn't exist handle it, 
    if (!user) {
        return done(null, false);
    }
    
    // Return user and exit the function
    done(null, user);

    } catch(error) {
        // Return error and exit the function
        done(error, false);
    }
}));

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log('profile', profile);
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
  
     // Check if user already exists by google.id: profile.id
      const existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
          console.log('User already exists in database')
        return done(null, existingUser);
      }
  
      console.log('Creating a new user');

      const newUser = new User({
        method: 'google',
        google: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });
  
      await newUser.save();
      done(null, newUser);
    } catch(error) {
      done(error, false, error.message);
    }
  }));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      // Find the user given the email
      const user = await User.findOne({ "local.email": email });
      
      // If no user is not found
      if (!user) {
        return done(null, false);
      }
    
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
    
      // If password is not correct
      if (!isMatch) {
          console.log('Password match:', isMatch);
        return done(null, false);
      }
    
      // Return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));

