import { connect, disconnect } from "mongoose";
import User from "../models/User.js";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    
    // Drop the old username unique index if it exists (causes duplicate key errors)
    try {
      await User.collection.dropIndex("username_1");
      console.log("Dropped old username_1 index");
    } catch (indexError: any) {
      // Index doesn't exist or other error - that's fine
      if (indexError.code !== 85 && indexError.code !== -6) {
        console.log("Index drop note:", indexError.message);
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };