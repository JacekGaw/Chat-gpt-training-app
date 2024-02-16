import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatClear from "./ChatClear";

const Chat = () => {
  const userMessage = useRef();
  const [dataFromServer, setDataFromServer] = useState();
  const [serverReadiness, setServerReadiness] = useState(false);

  const handleSubmit = (e) => {
    console.log(userMessage.current.value);
    e.preventDefault();
    let message = { userMessage: userMessage.current.value };
    fetch("http://localhost:3000/api/message", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((dataFromServer) => {
        // const chatResponse = dataFromServer.message.content;
        console.log(dataFromServer.message);
        setDataFromServer(dataFromServer.message);
        userMessage.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => {
        setDataFromServer(data);
        setServerReadiness(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full max-w-screen-md m-auto">
      <div className="w-full flex justify-start items-center gap-1">
        <p className="text-slate-300 text-xs">Serwer readiness:</p>
        <p className={`material-symbols-outlined text-[18px] flex justify-center items-center ${serverReadiness ? "text-green-500" : "text-red-500"}`}>{serverReadiness ? "done" : "close"}</p>
      </div>
      <div
        id="chatOutput"
        className="w-full  bg-black bg-opacity-50 drop-shadow-lg rounded-xl h-[500px] max-h-screen overflow-y-auto *:text-slate-100 p-5"
      >
        <ChatMessages dataFromServer={dataFromServer} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full gap-2 flex justify-center "
      >
        <input
          type="text"
          ref={userMessage}
          placeholder="Type your message here..."
          className="flex-1 drop-shadow-lg bg-black bg-opacity-50 rounded-lg p-2 text-slate-100 font-[300]"
        />
        <button
          type="submit"
          className="bg-purple-900 text-slate-300 py-2 px-4 drop-shadow-lg hover:-translate-y-1 translate-all duration-200 rounded-lg "
          disabled={!serverReadiness}
        >
          Send
        </button>
      </form>
      <ChatClear onClearHistory={() => setDataFromServer()} />
    </div>
  );
};

export default Chat;
