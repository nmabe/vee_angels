import { useState, useEffect } from 'react'
import { ReviewItem } from './ReviewItem'
import { ChevronDown, ChevronUp } from 'lucide-react'

export const ReviewsList = ({
  angelId,
  reviews = [],
  onEdit,
  onDelete,
  loading
}) => {
  const [sortBy, setSortBy] = useState('newest')
  const [sortedReviews, setSortedReviews] = useState(reviews)

  useEffect(() => {
    let sorted = [...reviews]

    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating)
        break
      default:
        break
    }

    setSortedReviews(sorted)
  }, [reviews, sortBy])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reviews yet</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Reviews ({reviews.length})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewItem
            key={review._id}
            review={review}
            currentUserId={localStorage.getItem('userId')}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
