import { useRouter } from "next/router";
import Link from "next/link";
import data from "../data.json";

export default function Home({ movies }) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4">
      <nav className="bg-gray-800 p-4 rounded-lg">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" className="text-white hover:text-gray-300">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/genres" className="text-white hover:text-gray-300">
              Genres
            </Link>
          </li>
          <li>
            <Link href="/directors" className="text-white hover:text-gray-300">
              Directors
            </Link>
          </li>
          <li>
            <Link href="/help" className="text-white hover:text-gray-300">
              Help
            </Link>
          </li>
        </ul>
      </nav>

      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Movie House
        </h1>
        <p className="text-gray-600 mt-2">
          Discover and explore a wide range of movies.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Trending Movies
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="text-blue-600 hover:underline"
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => router.push("/movies")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          View All Movies
        </button>
        <button
          onClick={() => router.push("/genres")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Browse Genres
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const movies = data.movies;
  return {
    props: {
      movies,
    },
    revalidate: 60,
  };
}
