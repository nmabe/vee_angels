import { StarRating } from './StarRating'
import { Trash2, Edit2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const ReviewItem = ({ review, currentUserId, onEdit, onDelete }) => {
  const isAuthor = review.reviewerId._id === currentUserId
  const createdDate = new Date(review.createdAt)
  const isEdited = new Date(review.updatedAt) > createdDate

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await onDelete(review._id)
      } catch (error) {
        alert('Failed to delete review')
      }
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {review.reviewerId.profPicUrl?.[0] && (
            <img
              src={review.reviewerId.profPicUrl[0]}
              alt={review.reviewerId.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">
              {review.reviewerId.username}
            </p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true
              })}
              {isEdited && ' (edited)'}
            </p>
          </div>
        </div>
        {isAuthor && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(review)}
              className="p-1 hover:bg-gray-200 rounded transition"
              title="Edit review"
            >
              <Edit2 size={16} className="text-blue-600" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-gray-200 rounded transition"
              title="Delete review"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        )}
      </div>

      <div className="mb-2">
        <StarRating rating={review.rating} interactive={false} size="sm" />
      </div>

      {review.reviewText && (
        <p className="text-gray-700 text-sm leading-relaxed">
          {review.reviewText}
        </p>
      )}

      {review.helpful > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {review.helpful} people found this helpful
        </p>
      )}
    </div>
  )
}
