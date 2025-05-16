import executeQuery from "./db";
import data from "../data.json";

async function createTables() {
  try {
    console.log("Creating genres table...");
    await executeQuery({
      query: `CREATE TABLE IF NOT EXISTS genres (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )`,
    });

    console.log("Creating directors table...");
    await executeQuery({
      query: `CREATE TABLE IF NOT EXISTS directors (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        biography TEXT
      )`,
    });

    console.log("Creating movies table...");
    await executeQuery({
      query: `CREATE TABLE IF NOT EXISTS movies (
        id VARCHAR(10) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        directorId VARCHAR(10),
        description TEXT,
        releaseYear INT,
        genreId VARCHAR(10),
        rating DECIMAL(3,1),
        FOREIGN KEY (directorId) REFERENCES directors(id),
        FOREIGN KEY (genreId) REFERENCES genres(id)
      )`,
    });

    console.log("All tables created successfully");
    return { success: true };
  } catch (error) {
    console.error("Error creating tables:", error);
    return { success: false, error: error.message };
  }
}

async function importData() {
  try {
    console.log("Importing genres data...");
    for (const genre of data.genres) {
      await executeQuery({
        query: `INSERT IGNORE INTO genres (id, name) VALUES (?, ?)`,
        values: [genre.id, genre.name],
      });
    }

    console.log("Importing directors data...");
    for (const director of data.directors) {
      await executeQuery({
        query: `INSERT IGNORE INTO directors (id, name, biography) VALUES (?, ?, ?)`,
        values: [director.id, director.name, director.biography],
      });
    }

    console.log("Importing movies data...");
    for (const movie of data.movies) {
      await executeQuery({
        query: `INSERT IGNORE INTO movies (id, title, directorId, description, releaseYear, genreId, rating) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values: [
          movie.id,
          movie.title,
          movie.directorId,
          movie.description,
          movie.releaseYear,
          movie.genreId,
          movie.rating,
        ],
      });
    }

    console.log("All data imported successfully");
    return { success: true };
  } catch (error) {
    console.error("Error importing data:", error);
    return { success: false, error: error.message };
  }
}

export async function initializeDatabase() {
  try {
    try {
      console.log("Checking database connection...");
      await executeQuery({
        query: `SELECT 1`,
      });
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection failed:", error);
      return {
        success: false,
        error:
          "Database connection failed. Make sure your MySQL server is running and credentials are correct.",
      };
    }

    const tablesResult = await createTables();
    if (!tablesResult.success) {
      return {
        success: false,
        error: `Failed to create tables: ${tablesResult.error}`,
      };
    }

    const dataResult = await importData();
    if (!dataResult.success) {
      return {
        success: false,
        error: `Failed to import data: ${dataResult.error}`,
      };
    }

    console.log("Database initialized successfully");
    return { success: true };
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return { success: false, error: error.message };
  }
}
