import { useState } from "react";
import Link from "next/link";
import data from "../data.json";

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genreId === selectedGenre : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
        Explore Movies
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">
          {favorites.length} Favorite{favorites.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {movie.title}
              </h3>
              <button
                onClick={() => toggleFavorite(movie.id)}
                className="absolute top-0 right-0 p-1 text-2xl"
                title={
                  favorites.includes(movie.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"
                }
              >
                {favorites.includes(movie.id) ? "❤️" : "🤍"}
              </button>
            </div>
            <p className="text-gray-600 mt-2 line-clamp-2">
              {movie.description}
            </p>
            <div className="flex items-center mt-3">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="ml-1 text-gray-700 font-medium">
                {movie.rating}
              </span>
            </div>
            <Link
              href={`/movies/${movie.id}`}
              className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No movies found. Try adjusting your search or genre filter.
        </p>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const movies = data.movies;
  const genres = data.genres;
  return {
    props: {
      movies,
      genres,
    },
    revalidate: 60,
  };
}
