import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  try {
    const results = await executeQuery({
      query: "SELECT * FROM directors",
    });
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching directors", error: error.message });
  }
}
