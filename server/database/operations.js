import { connectToDatabase, closeDatabaseConnection } from './databaseConnection.js';

// Function to insert a document into the database
export async function addToDatabase(documentID, newMessage) {
  const db = await connectToDatabase();
  const collection = db.collection('convHistory');
  const result = await collection.findOneAndUpdate(
    { _id: documentID },
    {
      $setOnInsert: {
        timestamp: new Date(),
        messages: [],
      },
    },
    {
      upsert: true, // Create a new document if it doesn't exist
      returnDocument: 'after', // Return the modified document
    }
  );
  const updatedConversation = result.value || result;
  updatedConversation.messages.push(newMessage);

  await collection.updateOne({ _id: documentID }, { $set: { messages: updatedConversation.messages } });

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

