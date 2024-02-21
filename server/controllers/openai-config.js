import { config } from "dotenv";
config();
import OpenAI from "openai";
import { addToDatabase, findInDatabase } from "../database/operations.js";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main(convID, userMessage) {
  const databaseResponse = await findInDatabase(convID);
  const databaseMessages = await databaseResponse[0].messages;
  console.log(databaseMessages);
  let userMessageJson = {};
  if (userMessage) {
    userMessageJson = { role: "user", content: userMessage };
  } else {
    const contentInput = "Say that this is a test";
    userMessageJson = { role: "user", content: contentInput };
  }
  await addToDatabase(convID, userMessageJson);
  let mess = [...databaseMessages, userMessageJson];
  if (mess.length > 20) {
    let coppiedMess = mess.slice(mess.length - 20, mess.length);
    mess = coppiedMess;
  }
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant",
      },
      ...mess,
    ],
    model: "gpt-3.5-turbo",
  });

  const generatedMessage = completion.choices[0].message;
  await addToDatabase(convID, generatedMessage);

  return [...databaseMessages, userMessageJson, generatedMessage];
}

export default main;
