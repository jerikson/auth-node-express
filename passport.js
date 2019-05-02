const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = requre('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');


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