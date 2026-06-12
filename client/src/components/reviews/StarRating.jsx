import { Star } from 'lucide-react'
import { useState } from 'react'

export const StarRating = ({
  rating,
  setRating,
  interactive = false,
  size = 'md'
}) => {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleClick = (starIndex) => {
    if (interactive && setRating) {
      setRating(starIndex + 1)
    }
  }

  const handleMouseEnter = (starIndex) => {
    if (interactive) {
      setHoverRating(starIndex + 1)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  return (
    <div className={`flex gap-1 ${interactive ? 'cursor-pointer' : ''}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          disabled={!interactive}
          className={`${sizeClasses[size]} transition-colors ${
            interactive ? 'hover:text-yellow-400' : ''
          } ${
            (hoverRating || rating) > index
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        >
          <Star />
        </button>
      ))}
    </div>
  )
}
