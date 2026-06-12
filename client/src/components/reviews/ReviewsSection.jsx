import { useState } from 'react'
import { useReviews } from '../../hooks/useReviews'
import { ReviewForm } from './ReviewForm'
import { RatingSummary } from './RatingSummary'
import { ReviewsList } from './ReviewsList'
import { MessageCircle } from 'lucide-react'

export const ReviewsSection = ({ angelId }) => {
  const {
    reviews,
    stats,
    loading,
    error,
    submitReview,
    updateReviewItem,
    deleteReviewItem
  } = useReviews(angelId)
  const [showForm, setShowForm] = useState(false)
  const [editingReview, setEditingReview] = useState(null)

  // Check if user has already reviewed
  const currentUserId = localStorage.getItem('userId')
  const userReview = reviews.find((r) => r.reviewerId._id === currentUserId)

  const handleSubmitReview = async (data) => {
    try {
      if (editingReview) {
        await updateReviewItem(editingReview._id, data.rating, data.reviewText)
      } else {
        await submitReview(data.rating, data.reviewText)
      }
      setShowForm(false)
      setEditingReview(null)
    } catch (err) {
      throw err
    }
  }

  const handleEditReview = (review) => {
    setEditingReview(review)
    setShowForm(true)
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewItem(reviewId)
    } catch (err) {
      throw err
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingReview(null)
  }

  if (error && error !== '') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
      </div>

      {/* Rating Summary */}
      <RatingSummary stats={stats} />

      {/* Review Form Toggle or Form */}
      {!showForm && !currentUserId ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
          Please log in to write a review
        </div>
      ) : !showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
        >
          {userReview ? 'Update Your Review' : 'Write a Review'}
        </button>
      ) : (
        <ReviewForm
          angelId={angelId}
          onSubmit={handleSubmitReview}
          initialReview={editingReview}
          onCancel={handleCancel}
        />
      )}

      {/* Reviews List */}
      <ReviewsList
        angelId={angelId}
        reviews={reviews}
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
        loading={loading}
      />
    </div>
  )
}
