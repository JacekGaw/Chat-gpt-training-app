import * as fs from "fs";

const filePath = "history.json";

export async function createFile() {
  if (fs.existsSync(filePath)) {
    console.log("File exists. Reading history...");
  } else {
    console.log("File does not exist. Creating a new one...");
    const initialData = [
      {
        role: "system",
        content: "You are a helpful assistant that return JSON",
      },
    ];
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8");
  }
}

export async function getHistoryData() {
  let historyData = [];

  if (fs.existsSync(filePath)) {
    console.log("File exists. Reading history...");
    const data = fs.readFileSync(filePath, "utf-8");
    historyData = JSON.parse(data);
  }

  return historyData;
}

export async function clearHistory() {
  const initialData = [
    {
      role: "system",
      content: "You are a helpful assistant that return JSON",
    },
  ];
  fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8");
}
