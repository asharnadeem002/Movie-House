import executeQuery from "../../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const genreResults = await executeQuery({
      query: "SELECT * FROM genres WHERE id = ?",
      values: [id],
    });

    if (genreResults.length === 0) {
      return res.status(404).json({ message: "Genre not found" });
    }

    const moviesResults = await executeQuery({
      query: `
        SELECT m.*, d.name as directorName 
        FROM movies m
        LEFT JOIN directors d ON m.directorId = d.id
        WHERE m.genreId = ?
      `,
      values: [id],
    });

    res.status(200).json({
      genre: genreResults[0],
      movies: moviesResults,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies by genre",
      error: error.message,
    });
  }
}
