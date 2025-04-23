import data from "../../../data.json";

export default function Director({ director, movies }) {
  return (
    <div>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>
      <h2>Movies Directed</h2>
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

export async function getStaticPaths() {
  const movies = data.movies;
  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find((m) => m.id === params.id);
  if (!movie) {
    return {
      notFound: true,
    };
  }
  const director = data.directors.find((d) => d.id === movie.directorId);
  const moviesByDirector = data.movies.filter(
    (m) => m.directorId === director.id
  );
  return {
    props: {
      director,
      movies: moviesByDirector,
    },
    revalidate: 60,
  };
}
