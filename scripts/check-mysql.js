const mysql = require("mysql2/promise");

const options = [
  {
    name: "Default",
    config: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Password123",
    },
  },
  {
    name: "With auth_plugin",
    config: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Password123",
      authPlugin: "mysql_native_password",
    },
  },
  {
    name: "With SSL disabled",
    config: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Password123",
      ssl: false,
    },
  },
];

async function testConnection() {
  console.log("Testing MySQL connection with various configurations...");

  for (const option of options) {
    try {
      console.log(`\nTrying ${option.name} configuration...`);
      const connection = await mysql.createConnection(option.config);
      await connection.query("SELECT 1");
      console.log(
        `✅ Connection successful with ${option.name} configuration!`
      );

      const [dbs] = await connection.query('SHOW DATABASES LIKE "moviehouse"');
      if (dbs.length > 0) {
        console.log('✅ "moviehouse" database exists');

        await connection.query("USE moviehouse");
        const [tables] = await connection.query("SHOW TABLES");
        console.log(`✅ Tables in "moviehouse" database: ${tables.length}`);
        tables.forEach((table) => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
      } else {
        console.log('❌ "moviehouse" database does not exist');
      }

      await connection.end();
      return true;
    } catch (error) {
      console.error(
        `❌ Connection failed with ${option.name} configuration:`,
        error.message
      );
    }
  }

  console.error("\n❌ All connection attempts failed.");
  console.log("\nPlease try one of the following:");
  console.log("1. Run the fix-auth command: npm run fix-auth");
  console.log("2. Execute the SQL script in MySQL: scripts/fix-auth.sql");
  console.log("3. Make sure MySQL server is running and accessible");
  return false;
}

testConnection();
