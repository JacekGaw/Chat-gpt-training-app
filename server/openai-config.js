import { config } from "dotenv";
import * as fs from "fs";
config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const filePath = "history.json";

async function main(userMessage) {
  const messagesToChat = await checkIsHistoryFile();
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
  writeToFile([...messagesToChat, userMessageJson, generatedMessage]);

  return generatedMessage;
}

async function writeToFile(toWrite) {
  const updatedData = JSON.stringify(toWrite, null, 2);

  fs.writeFileSync(filePath, updatedData, "utf8");
  console.log("Conversation history has been written to the file.");
}

async function checkIsHistoryFile() {
  let historyData = [];

  if (fs.existsSync(filePath)) {
    console.log("File exists. Reading history...");
    const data = fs.readFileSync(filePath, "utf-8");
    historyData = JSON.parse(data);
  } else {
    console.log("File does not exist. Creating a new one...");
    const initialData = [{ role: "system", content: "You are a helpful assistant that return JSON" }];
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8");
    historyData = initialData;
  }

  return historyData;
}

export default main;