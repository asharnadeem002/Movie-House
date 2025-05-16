import { initializeDatabase } from "../../lib/setupDb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("API route: Starting database initialization...");
    const result = await initializeDatabase();

    if (result.success) {
      console.log("API route: Database initialized successfully");
      res.status(200).json({ message: "Database initialized successfully" });
    } else {
      console.error("API route: Failed to initialize database:", result.error);
      res.status(500).json({
        message: "Failed to initialize database",
        error: result.error,
        details: "Check server logs for more information",
      });
    }
  } catch (error) {
    console.error(
      "API route: An error occurred during database initialization:",
      error
    );
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
