import { useState } from 'react'
import { StarRating } from './StarRating'
import { X } from 'lucide-react'

export const ReviewForm = ({ angelId, onSubmit, initialReview, onCancel }) => {
  const [rating, setRating] = useState(initialReview?.rating || 0)
  const [reviewText, setReviewText] = useState(initialReview?.reviewText || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    setLoading(true)
    try {
      await onSubmit({ rating, reviewText })
      setRating(0)
      setReviewText('')
    } catch (err) {
      setError(err.message || 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          {initialReview ? 'Update Your Review' : 'Write a Review'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating *
        </label>
        <StarRating
          rating={rating}
          setRating={setRating}
          interactive={true}
          size="lg"
        />
        {rating > 0 && (
          <span className="ml-3 text-sm text-gray-600">
            {rating} out of 5 stars
          </span>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="reviewText"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Review (Optional)
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value.slice(0, 1000))}
          placeholder="Share your experience with this Angel..."
          maxLength={1000}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
        <p className="mt-1 text-sm text-gray-500">
          {reviewText.length}/1000 characters
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition"
        >
          {loading
            ? 'Submitting...'
            : initialReview
              ? 'Update Review'
              : 'Submit Review'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
