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


app.get("/api", async(req, res) => {
   res.json("I'am asistent from server. What can i do for you?");
});

app.post('/api/message', async(req, res) => {
  const {userMessage} = req.body;
  const chatRes = await main(userMessage);
  res.json({message: chatRes});
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});