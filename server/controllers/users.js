const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

// Create a token
signToken = user => {
    //res.json({user: 'created'});
    return token = JWT.sign({
        iss: 'jerikson', // who signed this token
        sub: user.id, // whom the token refers to
        iat: new Date().getTime(), // sec since Unix epoch
        expiresIn: '2 days' // expires in ..
    }, JWT_SECRET); // secret
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
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
        console.log('Successful login:', req.user);
    },

    secret: async (req, res, next) => {
        res.json({ secret: "resource" });
        console.log('Successfully access /secret');
    }
}