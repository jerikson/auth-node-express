const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});



// Pre middleware functions are executed one after another, when each middleware calls next.
userSchema.pre('save', async function(next) {
    try {
        // Generate a salt (10 rounds)
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);
        // Re-assign hashed version over origingal plain text password
        this.password = passwordHash;
        next();
    } catch(error) {
        next(error);
    }

});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;