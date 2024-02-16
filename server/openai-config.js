import { config } from "dotenv";
import * as fs from "fs";
config();
import OpenAI from "openai";
import { getHistoryData } from "./history-config.js";

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
  let mess = [...messagesToChat, userMessageJson]
  const completion = await openai.chat.completions.create({
    messages: mess,
    model: "gpt-3.5-turbo",
  });

  const generatedMessage = completion.choices[0].message;
  await writeToFile([...messagesToChat, userMessageJson, generatedMessage]);

  return [...messagesToChat, userMessageJson, generatedMessage];
}

async function writeToFile(toWrite) {
  const updatedData = JSON.stringify(toWrite, null, 2);

  fs.writeFileSync(filePath, updatedData, "utf8");
  console.log("Conversation history has been written to the file.");
}


export default main;