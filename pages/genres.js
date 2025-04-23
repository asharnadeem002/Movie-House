import Link from "next/link";
import data from "../data.json";

export default function Genres({ genres }) {
  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const genres = data.genres;
  return {
    props: {
      genres,
    },
  };
}
