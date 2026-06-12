import axios from 'axios'

const API_BASE_URL = 'https://vee-angels.onrender.com/api/reviews'

// Create or update a review
export const submitReview = async (angelId, rating, reviewText = '') => {
  const response = await axios.post(
    API_BASE_URL,
    { angelId, rating, reviewText },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  )
  return response.data.review
}

// Get all reviews for an Angel
export const getAngelReviews = async (angelId, page = 1, limit = 10) => {
  const response = await axios.get(`${API_BASE_URL}/angel/${angelId}`, {
    params: { page, limit }
  })
  return response.data
}

// Get a single review
export const getReview = async (reviewId) => {
  const response = await axios.get(`${API_BASE_URL}/${reviewId}`)
  return response.data
}

// Update a review
export const updateReview = async (reviewId, rating, reviewText = '') => {
  const response = await axios.put(
    `${API_BASE_URL}/${reviewId}`,
    { rating, reviewText },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  )
  return response.data.review
}

// Delete a review
export const deleteReview = async (reviewId) => {
  await axios.delete(`${API_BASE_URL}/${reviewId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
}

// Get rating statistics
export const getRatingStats = async (angelId) => {
  const response = await axios.get(`${API_BASE_URL}/rating/${angelId}`)
  return response.data
}
