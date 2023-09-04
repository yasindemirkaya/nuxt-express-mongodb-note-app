const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // E-postaların benzersiz olmasını sağlar
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
