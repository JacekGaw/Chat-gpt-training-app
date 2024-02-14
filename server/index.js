import express from "express";
const app = express();
const port = 3000;
import {config} from "dotenv";
config();

import main from "./openai-config.js";

main();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});