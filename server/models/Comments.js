const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
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
  commentText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

CommentsSchema.index({ angelId: 1, createdAt: -1 })
const Comments = mongoose.model('Comments', CommentsSchema)
module.exports = Comments
