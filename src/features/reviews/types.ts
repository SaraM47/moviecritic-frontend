// Represents minimal user information included in a review, returned from the backend only the user ID, sometimes a populated object
export interface ReviewUser {
  _id?: string
  username?: string
}

// Represents a movie review created by a user.
export interface Review {
  _id: string
  movieId: number
  userId: string | ReviewUser // Can be either a string (user ID) or an object containing user details
  title: string
  rating: number
  text: string
  createdAt: string
  updatedAt: string
}

// Redux state used for managing reviews.
export interface ReviewsState {
  reviews: Review[] // List of reviews for a movie or user
  loading: boolean // Used when fetching reviews
  error: string | null // Error message if request fails
  actionLoading: boolean // Used for create/update/delete actions
}