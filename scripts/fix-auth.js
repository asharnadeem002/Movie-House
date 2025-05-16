const { exec } = require("child_process");

console.log("Fixing MySQL authentication for Node.js...");
console.log(
  "This will change the authentication method for your MySQL user to one compatible with Node.js drivers."
);

const command = `mysql -u root -pAlmariAlmari5 -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password123'; FLUSH PRIVILEGES;"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error("❌ Error executing MySQL command:", error.message);
    console.log(
      "\nTry running this command directly in your MySQL command line:"
    );
    console.log(
      "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password123';"
    );
    console.log("FLUSH PRIVILEGES;");
    process.exit(1);
  }

  if (stderr) {
    console.error("Command stderr:", stderr);
  }

  console.log("✅ MySQL authentication method updated successfully!");
  console.log(
    'Your MySQL user "root" now uses mysql_native_password authentication.'
  );
  console.log("You can now run the application without authentication issues.");
  process.exit(0);
});
