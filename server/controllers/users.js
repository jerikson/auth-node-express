const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  //res.json({user: 'created'});
  return JWT.sign({
    iss: 'jerikson',
    sub: user.id,
    iat: new Date().getTime(), // current time
    expiresIn: '2 days' // expires in..
  }, JWT_SECRET);
}

module.exports = {
  
    /*
    router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp)
  */
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if a user already exists with the same email
    // When using findOne() and check a nested prop, enclose in quotes
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user using LOCAL STRATEGY
    const newUser = new User({ 
      method: 'local',
      local: {
        email: email, 
        password: password
      }
    });

    // Save new user
    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  /*
    router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UserController.signIn)
  */
  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    // Repond with token
    res.status(200).json({ token });
  },

  /*
   router.route('/oauth/google')
   .post(passportGoogle, UserController.googleOAuth);
  */
  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log('req.user', req.user);
    const token = signToken(req.user);
    // Repond with token
    res.status(200).json({ token });
  },

  /*
   router.route('/secret')
   .get(passportJWT, UserController.secret);
  */
  secret: async (req, res, next) => {
    console.log('Successfully acccessed /secret');
    res.json({ secret: "resource" });
  }
}