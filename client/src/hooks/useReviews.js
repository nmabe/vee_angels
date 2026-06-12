import { useState, useEffect } from 'react'
import * as reviewsApi from '../api/reviewsApi'

export const useReviews = (angelId) => {
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [angelId])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await reviewsApi.getAngelReviews(angelId)
      setReviews(data.reviews)
      setStats(data.stats)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load reviews')
      console.error('Error fetching reviews:', err)
    } finally {
      setLoading(false)
    }
  }

  const submitReview = async (rating, reviewText = '') => {
    try {
      const review = await reviewsApi.submitReview(angelId, rating, reviewText)
      await fetchReviews()
      return review
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to submit review')
    }
  }

  const updateReviewItem = async (reviewId, rating, reviewText = '') => {
    try {
      await reviewsApi.updateReview(reviewId, rating, reviewText)
      await fetchReviews()
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to update review')
    }
  }

  const deleteReviewItem = async (reviewId) => {
    try {
      await reviewsApi.deleteReview(reviewId)
      await fetchReviews()
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete review')
    }
  }

  return {
    reviews,
    stats,
    loading,
    error,
    fetchReviews,
    submitReview,
    updateReviewItem,
    deleteReviewItem
  }
}
