MovieApp
A modern movie discovery web application built with React and Vite, featuring trending movies, search, and like-based popularity using Appwrite as a backend.

# MovieApp

A modern movie discovery web application built with React and Vite, featuring trending movies, search, and like-based popularity using Appwrite as a backend.

## Features

- 🔍 Search for movies using the TMDB API
- 🎬 View trending movies by search count and by likes
- ❤️ Like movies and see the most liked ones
- 📄 Movie details with cast information
- ⚡ Fast, responsive UI with instant feedback
- ☁️ Persistent like counts using Appwrite database

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend/Database:** Appwrite
- **APIs:** TMDB (The Movie Database)
- **Icons:** react-icons

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/MovieApp.git
   cd MovieApp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add your TMDB API key and Appwrite credentials:
     ```
     VITE_TMDB_API_KEY=your_tmdb_api_key
     VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
     VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
     VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
     ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Use the search bar to find movies.
- Click the heart icon to like a movie.
- Trending sections show the most searched and most liked movies.
- Click "Details" for more information and cast.

## Project Structure

- `src/components/` – React components (MovieCard, Search, Loader, etc.)
- `src/appwrite.js` – Appwrite integration and database logic
- `src/App.jsx` – Main application logic

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License


Features
🔍 Search for movies using the TMDB API
🎬 View trending movies by search count and by likes
❤️ Like movies and see the most liked ones
📄 Movie details with cast information
⚡ Fast, responsive UI with instant feedback
☁️ Persistent like counts using Appwrite database
Tech Stack
Frontend: React, Vite, Tailwind CSS
Backend/Database: Appwrite
APIs: TMDB (The Movie Database)
Icons: react-icons
Installation
Clone the repository:

Install dependencies:

Set up environment variables:

Create a .env file in the root directory.
Add your TMDB API key and Appwrite credentials:
Start the development server:

Open the app:

Visit http://localhost:5173 in your browser.
Usage
Use the search bar to find movies.
Click the heart icon to like a movie.
Trending sections show the most searched and most liked movies.
Click "Details" for more information and cast.
Project Structure
src/components/ – React components (MovieCard, Search, Loader, etc.)
src/appwrite.js – Appwrite integration and database logic
src/App.jsx – Main application logic
