const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    angelId: {
        type: String,
        ref: 'Angel',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Likes = mongoose.model('Likes', LikesSchema);
module.exports = Likes;