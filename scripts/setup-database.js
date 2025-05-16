import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";
import { initializeDatabase } from "../lib/setupDb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env.local") });

async function setup() {
  console.log("Starting database initialization...");

  try {
    const result = await initializeDatabase();

    if (result.success) {
      console.log("✅ Database setup completed successfully!");
      console.log("Tables created and data imported.");
      process.exit(0);
    } else {
      console.error("❌ Database setup failed:", result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    process.exit(1);
  }
}

setup();
