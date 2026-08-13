const mongoose = require('mongoose')

const LikesSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  angelId: {
    type: String,
    ref: 'Angel',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

LikesSchema.index({ userId: 1, angelId: 1 })
const Likes = mongoose.model('Likes', LikesSchema)
module.exports = Likes
