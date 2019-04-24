module.exports = {
    // Email & password
    // req.value.body
    signUp: async (req, res, next) => {
        console.log('UsersController.signUp() called!');
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