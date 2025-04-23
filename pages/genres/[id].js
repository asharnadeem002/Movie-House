import data from "../../data.json";

export default function GenreDetails({ genre, movies }) {
  if (!genre) {
    return <div>Genre not found</div>;
  }

  return (
    <div>
      <h1>{genre.name}</h1>
      <h2>Movies in this Genre</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href={`/movies/${movie.id}`}>{movie.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const genre = data.genres.find((g) => g.id === params.id);
  if (!genre) {
    return {
      notFound: true,
    };
  }
  const movies = data.movies.filter((m) => m.genreId === genre.id);
  return {
    props: {
      genre,
      movies,
    },
  };
}
