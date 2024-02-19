import { connectToDatabase, closeDatabaseConnection } from './databaseConnection.js';

// Function to insert a document into the database
export async function addToDatabase(document) {
  const db = await connectToDatabase();
  const collection = db.collection('convHistory');
  const result = await collection.insertOne(document);
  console.log('Document inserted:', result.ops[0]);
}

// Function to find documents in the database
export async function findInDatabase(query = {}) {
  const db = await connectToDatabase();
  const collection = db.collection('convHistory');
  const documents = await collection.find(query).toArray();
  console.log('Found documents:', documents);
}

// Function to delete documents from the database
export async function deleteFromDatabase( query) {
  const db = await connectToDatabase();
  const collection = db.collection('convHistory');
  const result = await collection.deleteMany(query);
  console.log('Documents deleted:', result.deletedCount);
}

