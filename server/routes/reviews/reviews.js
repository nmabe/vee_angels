const express = require('express')
const Review = require('../../models/Review')
const Angel = require('../../models/Angel')
const User = require('../../models/User')
const mongoose = require('mongoose')
const { authMiddleware } = require('../../controllers/auth/authController')

const router = express.Router()

// @route   POST /api/reviews
// @desc    Create or update a review for an Angel
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { angelId, rating, reviewText } = req.body
    const reviewerId = req.user.id

    // Validate required fields
    if (!angelId || !rating) {
      return res.status(400).json({ error: 'Angel ID and rating are required' })
    }

    // Validate rating
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res
        .status(400)
        .json({ error: 'Rating must be an integer between 1 and 5' })
    }

    // Check if Angel exists
    const angel = await Angel.findById(angelId)
    if (!angel) {
      return res.status(404).json({ error: 'Angel not found' })
    }

    // Check if reviewer exists
    const reviewer = await User.findById(reviewerId)
    if (!reviewer) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if review already exists and update, or create new
    let review = await Review.findOne({ angelId, reviewerId })

    if (review) {
      // Update existing review
      review.rating = rating
      review.reviewText = reviewText || ''
      review.updatedAt = Date.now()
    } else {
      // Create new review
      review = new Review({
        angelId,
        reviewerId,
        rating,
        reviewText: reviewText || ''
      })
    }

    await review.save()

    // Update angel's average rating
    const reviews = await Review.find({ angelId })
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

    await Angel.findByIdAndUpdate(angelId, {
      rating: Math.round(avgRating * 10) / 10
    })

    // Populate reviewer details
    await review.populate('reviewerId', 'username profPicUrl email')

    res.status(201).json({
      message: 'Review saved successfully',
      review
    })
  } catch (error) {
    console.error('Error creating review:', error)
    res.status(500).json({ error: 'Error creating review' })
  }
})

// @route   GET /api/reviews/angel/:angelId
// @desc    Get all reviews for a specific Angel
// @access  Public
router.get('/angel/:angelId', async (req, res) => {
  try {
    const { angelId } = req.params
    const { page = 1, limit = 10 } = req.query

    // Check if Angel exists
    const angel = await Angel.findById(angelId)
    if (!angel) {
      return res.status(404).json({ error: 'Angel not found' })
    }

    const pageNum = parseInt(page, 10) || 1
    const pageSize = parseInt(limit, 10) || 10
    const skip = (pageNum - 1) * pageSize

    const reviews = await Review.find({ angelId })
      .populate('reviewerId', 'username profPicUrl email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)

    const totalReviews = await Review.countDocuments({ angelId })

    const stats = await Review.aggregate([
      { $match: { angelId: new mongoose.Types.ObjectId(angelId) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ])

    // Calculate rating distribution
    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }

    if (stats.length > 0) {
      stats[0].ratingDistribution.forEach((rating) => {
        ratingDistribution[rating] += 1
      })
    }

    res.json({
      reviews,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalReviews / pageSize),
        totalReviews,
        pageSize
      },
      stats: {
        avgRating:
          stats.length > 0 ? Math.round(stats[0].avgRating * 10) / 10 : 0,
        totalReviews,
        ratingDistribution
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).json({ error: 'Error fetching reviews' })
  }
})

// @route   GET /api/reviews/:reviewId
// @desc    Get a single review
// @access  Public
router.get('/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate('reviewerId', 'username profPicUrl email')
      .populate('angelId', 'username profPicUrl')

    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    res.json(review)
  } catch (error) {
    console.error('Error fetching review:', error)
    res.status(500).json({ error: 'Error fetching review' })
  }
})

// @route   PUT /api/reviews/:reviewId
// @desc    Update a review (only by author)
// @access  Private
router.put('/:reviewId', authMiddleware, async (req, res) => {
  try {
    const { rating, reviewText } = req.body
    const userId = req.user.id

    const review = await Review.findById(req.params.reviewId)

    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    // Check authorization
    if (review.reviewerId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Not authorized to update this review' })
    }

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5 || !Number.isInteger(rating))) {
      return res
        .status(400)
        .json({ error: 'Rating must be an integer between 1 and 5' })
    }

    // Update review
    if (rating) review.rating = rating
    if (reviewText !== undefined) review.reviewText = reviewText
    review.updatedAt = Date.now()

    await review.save()

    // Update angel's average rating
    const allReviews = await Review.find({ angelId: review.angelId })
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0

    await Angel.findByIdAndUpdate(review.angelId, {
      rating: Math.round(avgRating * 10) / 10
    })

    await review.populate('reviewerId', 'username profPicUrl email')

    res.json({
      message: 'Review updated successfully',
      review
    })
  } catch (error) {
    console.error('Error updating review:', error)
    res.status(500).json({ error: 'Error updating review' })
  }
})

// @route   DELETE /api/reviews/:reviewId
// @desc    Delete a review (by author or admin)
// @access  Private
router.delete('/:reviewId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id

    const review = await Review.findById(req.params.reviewId)

    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    // Check authorization
    if (review.reviewerId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Not authorized to delete this review' })
    }

    const angelId = review.angelId
    await Review.findByIdAndDelete(req.params.reviewId)

    // Update angel's average rating
    const remainingReviews = await Review.find({ angelId })
    const avgRating =
      remainingReviews.length > 0
        ? remainingReviews.reduce((sum, r) => sum + r.rating, 0) /
          remainingReviews.length
        : 0

    await Angel.findByIdAndUpdate(angelId, {
      rating: Math.round(avgRating * 10) / 10
    })

    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    res.status(500).json({ error: 'Error deleting review' })
  }
})

// @route   GET /api/reviews/rating/:angelId
// @desc    Get rating statistics for an Angel
// @access  Public
router.get('/rating/:angelId', async (req, res) => {
  try {
    const { angelId } = req.params

    const reviews = await Review.find({ angelId })

    if (reviews.length === 0) {
      return res.json({
        avgRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      })
    }

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    const ratingDistribution = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length
    }

    res.json({
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution
    })
  } catch (error) {
    console.error('Error fetching rating stats:', error)
    res.status(500).json({ error: 'Error fetching rating stats' })
  }
})

module.exports = router
