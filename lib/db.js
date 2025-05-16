import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE || "moviehouse",
  user: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "Password123",
};

console.log("MySQL Connection Config:", {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
});

let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export default async function executeQuery({ query, values = [] }) {
  try {
    const pool = getPool();
    const [results] = await pool.query(query, values);
    return results;
  } catch (error) {
    console.error("Database error:", error.message);
    console.error("Query:", query);
    console.error("Values:", values);
    throw new Error(`Database error: ${error.message}`);
  }
}
