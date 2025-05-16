const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password123",
  database: "moviehouse",
};

async function main() {
  let connection;

  try {
    console.log("Connecting to MySQL server...");
    connection = await mysql.createConnection(dbConfig);

    console.log("Connection successful!");

    console.log("Checking tables...");
    const [tables] = await connection.query("SHOW TABLES");
    console.log("Tables in database:");
    tables.forEach((table) => {
      console.log(`- ${Object.values(table)[0]}`);
    });

    const tableNames = tables.map((t) => Object.values(t)[0]);

    for (const tableName of tableNames) {
      const [results] = await connection.query(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );
      console.log(`Records in ${tableName}: ${results[0].count}`);
    }

    console.log("✅ Database verification completed successfully!");
  } catch (error) {
    console.error("❌ Error verifying database:", error.message);
    console.error(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();
