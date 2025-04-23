import Link from "next/link";
import data from "../../data.json";

export default function MovieDetails({ movie, director }) {
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>
        Director:{" "}
        <Link href={`/movies/${movie.id}/director`}>{director.name}</Link>
      </p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>
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
  return {
    props: {
      movie,
      director,
    },
    revalidate: 60,
  };
}
