const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    // Where the token is contained and where the secret is
    // passport will decode the token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET

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


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find user by input email
        const user = await User.findOne({ email });
        // If user does not exist
        if (!user) {
            return done(null, false);
        }
        // If user exists, check if password if correct
        const isMatch = await user.isValidPassword(password);
        
        // If password does not match
        if (!isMatch) {
            return done(null, false);
        }

        // Return user
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

