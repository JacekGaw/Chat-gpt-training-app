import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
const port = 3000;
import {config} from "dotenv";
config();

import main from "./openai-config.js";
import { createFile, getHistoryData, clearHistory } from "./history-config.js";


app.get("/api", async(req, res) => {
  await createFile();
  const historyData = await getHistoryData();
   res.json(historyData);
});

app.post('/api/message', async(req, res) => {
  const {userMessage} = req.body;
  const chatRes = await main(userMessage);
  res.json({message: chatRes});
})

app.post('/api/clear-history', async(req, res) => {
  await clearHistory();
  res.json("History cleared");
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});