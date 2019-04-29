const JWT = require('jsonwebtoken');
const User = require('../models/user');

// Create a token
signToken = user => {
    //res.json({user: 'created'});
    return token = JWT.sign({
        iss: 'jerikson', // who signed this token
        sub: newUser.id, // whom the token refers to
        iat: new Date().getTime(), // sec since Unix epoch
        exp: new Date().setDate(new Date().getDate() + 1) // expiration time, now + 1 day ahead
    }, 'somesecret'); // secret
}

module.exports = {
    // Email & password
    // req.value.body
    signUp: async (req, res, next) => {
        const { email, password } = req.value.body;
        
        // Check user already exists, by email
        const foundUser = await User.findOne({ email });
        if (foundUser) { 
            return res.status(403).send({ error: 'Email is already in use'})
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();
        
        // Generate token
        const token = signToken(newUser);

        // Respond with token
        res.status(200).json({ token });
    }, 

    
    signIn: async (req, res, next) => {
        
    },

    // 
    secret: async (req, res, next) => {
      
    }
}