import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid';
import {config} from "dotenv";
import main from "./controllers/openai-config.js";
import { addToDatabase, createDocument, findInDatabase, getHistory, deleteConversation } from './database/operations.js';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
const port = 3000;
config();





app.get("/startConversation", async (req, res) => {
  const newConvID = await uuidv4();
  await createDocument(newConvID);
  res.json(JSON.stringify(newConvID));
})

app.get("/history", async (req, res) => {
  const history = await getHistory({});
  res.json(JSON.stringify(history));
})

app.get("/:convID", async (req, res) => {
  const convID = req.params.convID;
  const isFound = await findInDatabase(convID);
  if (!isFound) {
    res.status(400).send({error: 'Not Found'});
  }
  else {
    res.json(isFound);
  }
});

app.post('/:convID/message', async(req, res) => {
  const {userMessage} = req.body;
  const convID = req.params.convID;
  const chatRes = await main(convID, userMessage);
  res.json({message: chatRes});
})

app.delete('/delete', async (req, res) => {
  const {convID} = req.body;
  const deleteResponse = await deleteConversation(convID);
  res.send(deleteResponse.status);
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
