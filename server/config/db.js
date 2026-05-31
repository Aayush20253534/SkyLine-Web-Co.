import mongoose from "mongoose";
import { env } from "./env.js";

const RETRY_DELAY_MS = 5000;
const MAX_RETRIES = 5;

const connectDB = async (
  retries = MAX_RETRIES
) => {
  try {
    await mongoose.connect(
      env.mongoUri,
      {
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log(
      `[DB] MongoDB Connected: ${mongoose.connection.host}`
    );
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `[DB] Connection failed. Retrying in ${
          RETRY_DELAY_MS / 1000
        }s... (${retries} retries remaining)`
      );

      await new Promise((resolve) =>
        setTimeout(
          resolve,
          RETRY_DELAY_MS
        )
      );

      return connectDB(retries - 1);
    }

    console.error(
      "[DB] Failed to connect to MongoDB:",
      error.message
    );

    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();

    console.log(
      "[DB] MongoDB connection closed."
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "[DB] Shutdown error:",
      error.message
    );

    process.exit(1);
  }
});

export default connectDB;