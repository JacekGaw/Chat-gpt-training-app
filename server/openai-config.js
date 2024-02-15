import { config } from "dotenv";
config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {role: 'system', content: "You are a helpful assistant designed to output JSON."},
      { role: "user", content: "Say this is a test" }
      
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message;
}

export default main;
