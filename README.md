# MovieCritic - Movie review platform

## Overview
MovieCritic is a web application for informations searching and reviews, where users can search for movies and write reviews about them. The platform allows visitors to explore movie information and read reviews written by other users. Registered users can create, edit and delete their own reviews.

The application integrates with the TMDB (The Movie Database) API to fetch movie data and combines it with a custom backend API for handling user authentication and review management.

- Link to the MovieCritic backend-repo: [Backend-repo](https://github.com/SaraM47/moviecritic-backend) 

## Features
### Movie search

Users can search for movies through a search interface powered by the TMDB API.

Features include:

- search movies by title
- view list of search results
- browse movie posters and metadata

### Movie details

Each movie has its own detailed page showing:

- movie title
- description
- poster image
- reviews written by users
Users can read full reviews through a modal interface.

### User authentication

The platform includes a complete authentication system.

Users can:

- register an account
- login
- stay authenticated using JWT tokens
- logout

Authentication is required to create or manage reviews.

### Review system (CRUD)

Logged-in users can manage their own reviews.

Supported operations:

* Create review - write a review for any movie.

* Read reviews - all visitors can read reviews written by users.

* Update review - users can edit their own reviews.

* Delete review - users can delete reviews they created.

Each review contains:

review id, movie id, user id, review title, rating (1-10), review text and creation date

### User profile

Users have a personal profile page where they can:

- view their own reviews
- edit reviews
- delete reviews
- navigate back to the movie they reviewed

## Technical stack
- React
- TypeScript
- Redux Toolkit (state management)
- React Router (routing)
- TailwindCSS (styling)
- Lucide Icons
- React Hot Toast (notifications)

## Exernal API
The application integrates with TMDB API which is used for movie details, search, poster images and metadata.

## State management
The application uses Redux Toolkit for state management.

Slices used:

* Movies slice
Handles movie search and movie details.

* Reviews slice
Handles CRUD operations for reviews.

* Auth slice
Handles authentication state and user session.

## Architectural layers

The application is organized into several layers that separate responsibilities and make the codebase easier to understand and maintain.

1. Pages

The pages folder contains the main views of the application. Each page corresponds to a route and is responsible for connecting Redux state with UI components, handling page specific logic and rendering layout components. Examples of pages in the application include HomePage, SearchPage, MoviePage, ProfilePage, LoginPage and RegisterPage.

2. Components

The components folder contains reusable UI components that render visual elements of the interface. These components are grouped by domain in order to keep the structure organized. Layout components such as Navbar and Footer handle the global page structure. Hero components such as HeroSlider and HeroSlide are used for the landing page presentation. Movie components like MovieCard and MovieGrid display movie information retrieved from the external API. Review components such as ReviewCard and ReviewForm handle the display and management of user reviews. Search components like SearchSuggestions enhance the search functionality.

3. UI Components

The ui folder contains smaller reusable interface elements that are used throughout the application. Components such as Button, Input, Modal, Spinner, SkeletonMovieGrid and ErrorBox help maintain a consistent design system and reduce duplicated code across pages and features.

4. Features (State management)

The features folder contains the Redux slices that manage the global application state. Each feature defines its state structure, asynchronous actions and reducers. Examples include authSlice, moviesSlice and reviewsSlice, which manage authentication, movie data retrieved from the TMDB API and user review data.

5. API Layer

The api folder centralizes all communication with external services and the backend API. Files such as authApi, moviesApi, reviewsApi and tmdbApi handle HTTP requests and ensure that API logic remains separate from UI components.

6. Hooks

The hooks folder contains custom React hooks used across the application. For example, the useDebounce hook improves search performance by preventing unnecessary API requests when the user types in the search field.

7. Router

The router folder defines the routing structure of the application. The AppRouter component manages page navigation and ensures that protected routes are only accessible to authenticated users.

8. Styles

The styles folder contains global styling for the application. The globals.css file defines typography, layout helpers, design tokens and TailwindCSS configuration used across the project.


## Possible future improvements

The platform could be extended with additional features such as:

- Review rating statistics by display average ratings for each movie.
 
- Allow users to like other reviews.

- Pagination for reviews that could improve performance by loading reviews in pages.

- Sorting and filtering for sort reviews by rating, date or popularity.

- Add profile pictures and more detailed user information.

- Allow users to follow other reviewers.

- Like system for reviews and alllow users to like other reviews.

- Review moderation to implement admin roles to manage inappropriate reviews.

- Bookmark or watchlist that could allow users to save movies to a personal list.

## Running the project
1. Clone the repository
```sh
git clone https://github.com/SaraM47/moviecritic-frontend.git 
```
2. Install frontend dependencies
```sh
cd movecritc-frontend
```
```sh
npm install
```
3. Start the frontend development server
```sh
npm run dev
```
