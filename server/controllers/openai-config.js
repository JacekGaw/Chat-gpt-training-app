import { config } from "dotenv";
import * as fs from "fs";
config();
import OpenAI from "openai";
import { getHistoryData, writeToFile } from "./history-config.js";
import { addToDatabase, findInDatabase, deleteFromDatabase } from '../database/operations.js';
const chatID = "1234567";


const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const filePath = "history.json";

async function main(userMessage) {
  const messagesToChat = await getHistoryData();
  let userMessageJson = {};
  if (userMessage) {
    userMessageJson = { role: "user", content: userMessage };
  } else {
    const contentInput = "Say that this is a test";
    userMessageJson = { role: "user", content: contentInput };
  }
  await addToDatabase(chatID, userMessageJson);
  let mess = [...messagesToChat, userMessageJson];
  if(mess.length > 20) {
    let coppiedMess = mess.slice(mess.length - 20, mess.length);
    mess = coppiedMess;
  }
  const completion = await openai.chat.completions.create({
    messages: [{
      "role": "system",
      "content": "You are a helpful assistant that return JSON, wrap any code examples in <pre></pre>"
    }, ...mess],
    model: "gpt-3.5-turbo",
  });

  const generatedMessage = completion.choices[0].message;
  await addToDatabase(chatID, generatedMessage);

  await writeToFile([...messagesToChat, userMessageJson, generatedMessage]);

  return [...messagesToChat, userMessageJson, generatedMessage];
}



export default main;