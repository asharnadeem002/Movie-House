import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const results = await executeQuery({
      query: `
        SELECT m.*, g.name as genreName, d.name as directorName 
        FROM movies m
        LEFT JOIN genres g ON m.genreId = g.id
        LEFT JOIN directors d ON m.directorId = d.id
        WHERE m.id = ?
      `,
      values: [id],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie details", error: error.message });
  }
}
