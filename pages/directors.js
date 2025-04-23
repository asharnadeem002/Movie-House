import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Directors() {
  const { data: directors, error: directorsError } = useSWR(
    "/api/directors",
    fetcher
  );
  const { data: movies, error: moviesError } = useSWR("/api/movies", fetcher);

  if (directorsError || moviesError)
    return <div className="text-center text-red-500">Failed to load data</div>;
  if (!directors || !movies)
    return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Directors</h1>
      {directors.map((director) => {
        const directedMovies = movies.filter(
          (movie) => movie.directorId === director.id
        );
        return (
          <div key={director.id} className="mb-8">
            <h2 className="text-2xl font-semibold">{director.name}</h2>
            <p className="text-gray-700 mt-2">{director.biography}</p>
            <h3 className="text-xl font-medium mt-4">Movies Directed:</h3>
            {directedMovies.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {directedMovies.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      href={`/movies/${movie.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {movie.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No movies directed.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
