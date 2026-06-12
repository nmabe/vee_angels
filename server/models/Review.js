const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    angelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Angel',
      required: true
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    reviewText: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    helpful: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

// Compound index to ensure one review per user per angel
reviewSchema.index({ angelId: 1, reviewerId: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
