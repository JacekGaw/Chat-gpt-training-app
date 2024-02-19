import { MongoClient } from "mongodb";

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'chatDatabase';

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the MongoDB server
export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw err;
  }
}

// Function to close the MongoDB connection
export function closeDatabaseConnection() {
  if (client.isConnected()) {
    client.close();
    console.log('MongoDB connection closed.');
  }
}

