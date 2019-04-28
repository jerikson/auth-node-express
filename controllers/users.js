const User = require('../models/user');

module.exports = {
    // Email & password
    // req.value.body
    signUp: async (req, res, next) => {
        console.log('UsersController.signUp() called!');
        
        const { email, password } = req.value.body;
        const newUser = new User({ email, password });
        await newUser.save();
        
        res.json({user: 'created'});
    }, 

    // Generate token
    signIn: async (req, res, next) => {
        console.log('UsersController.signIn() called!');
    },

    // 
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!');
    }
}