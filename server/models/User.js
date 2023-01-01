const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profPic: {
        type: String,
        default: 'https://res.cloudinary.com/dddjh584x/image/upload/v1748597484/klzpdazf79zhkio0nu1a.webp'
    },
    joined: {
        type: Date,
        default: new Date().toLocaleString(),
    },
    role: {
        type: String,
        default: 'user',
    }
});


const User = mongoose.model('User', userSchema);
module.exports =  User; 