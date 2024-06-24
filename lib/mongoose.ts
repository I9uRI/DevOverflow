import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("Please set your MONGODB_URI environment variable.");
  }

  if (isConnected) {
    return console.log("Already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "DevFlow",
    });

    isConnected = true;
    console.log("Connected to database");
  } catch (error) {}
};
