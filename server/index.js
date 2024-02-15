import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;
import {config} from "dotenv";
config();

import main from "./openai-config.js";


app.get("/api", async(req, res) => {
  const chatRes = await main();
  console.log(chatRes);
   res.json(chatRes.content);
});

app.post('/api/message', async(req, res) => {
  const chatRes = await main();
  console.log(chatRes);
  res.json(chatRes);
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});