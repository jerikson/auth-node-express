const User = require('../models/user');

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
        
        // Respond with token
        res.json({user: 'created'});
    }, 

    // Generate token
    signIn: async (req, res, next) => {
    
    },

    // 
    secret: async (req, res, next) => {
      
    }
}