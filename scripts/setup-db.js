const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password123",
  multipleStatements: true,
};

const DB_NAME = "moviehouse";

const dataPath = path.join(__dirname, "../data.json");
console.log("Reading data from:", dataPath);
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

async function main() {
  console.log("Starting database setup...");

  let connection;

  try {
    console.log("Connecting to MySQL server...");
    connection = await mysql.createConnection(dbConfig);

    console.log("Creating database if it doesn't exist...");
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);

    console.log("Switching to database:", DB_NAME);
    await connection.query(`USE ${DB_NAME};`);

    console.log("Creating tables...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS genres (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS directors (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        biography TEXT
      );
      
      CREATE TABLE IF NOT EXISTS movies (
        id VARCHAR(10) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        directorId VARCHAR(10),
        description TEXT,
        releaseYear INT,
        genreId VARCHAR(10),
        rating DECIMAL(3,1),
        FOREIGN KEY (directorId) REFERENCES directors(id),
        FOREIGN KEY (genreId) REFERENCES genres(id)
      );
    `);

    console.log("Importing genres data...");
    for (const genre of data.genres) {
      await connection.query(
        "INSERT IGNORE INTO genres (id, name) VALUES (?, ?)",
        [genre.id, genre.name]
      );
    }

    console.log("Importing directors data...");
    for (const director of data.directors) {
      await connection.query(
        "INSERT IGNORE INTO directors (id, name, biography) VALUES (?, ?, ?)",
        [director.id, director.name, director.biography]
      );
    }

    console.log("Importing movies data...");
    for (const movie of data.movies) {
      await connection.query(
        `INSERT IGNORE INTO movies 
         (id, title, directorId, description, releaseYear, genreId, rating) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          movie.id,
          movie.title,
          movie.directorId,
          movie.description,
          movie.releaseYear,
          movie.genreId,
          movie.rating,
        ]
      );
    }

    console.log("✅ Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();
