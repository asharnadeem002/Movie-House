import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const directorResults = await executeQuery({
      query: "SELECT * FROM directors WHERE id = ?",
      values: [id],
    });

    if (directorResults.length === 0) {
      return res.status(404).json({ message: "Director not found" });
    }

    const moviesResults = await executeQuery({
      query: "SELECT * FROM movies WHERE directorId = ?",
      values: [id],
    });

    const director = directorResults[0];
    director.movies = moviesResults;

    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching director details",
      error: error.message,
    });
  }
}
