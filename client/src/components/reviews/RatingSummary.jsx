import { StarRating } from './StarRating'

export const RatingSummary = ({ stats }) => {
  if (!stats || stats.totalReviews === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">
          No reviews yet. Be the first to review!
        </p>
      </div>
    )
  }

  const { avgRating, totalReviews, ratingDistribution } = stats

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{avgRating}</div>
          <div className="flex justify-center my-2">
            <StarRating
              rating={Math.round(avgRating)}
              interactive={false}
              size="md"
            />
          </div>
          <p className="text-sm text-gray-600">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-gray-900 mb-3">
            Rating Distribution
          </h4>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3 mb-2">
              <span className="w-8 text-sm font-medium text-gray-600">
                {star}★
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{
                    width:
                      totalReviews > 0
                        ? `${(ratingDistribution[star] / totalReviews) * 100}%`
                        : '0%'
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {ratingDistribution[star]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
