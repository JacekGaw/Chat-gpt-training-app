import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import RespondingLoader from "./RespondingLoader";
import { useParams, useNavigate, Link } from "react-router-dom";
import History from "./History";

const Chat = () => {
  const navigate = useNavigate();
  const userMessage = useRef();
  const [dataFromServer, setDataFromServer] = useState([]);
  const [serverReadiness, setServerReadiness] = useState(false);
  const [loading, setLoading] = useState(false);


  let { conversationIDparam } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = { userMessage: userMessage.current.value };
    setLoading(true);
    fetch(`http://localhost:3000/${conversationIDparam}/message`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((dataFromServer) => {
        setLoading(false);
        console.log(dataFromServer.message);
        setDataFromServer(dataFromServer.message);
        userMessage.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function fetchFromProject() {
      try {
        let response = await fetch(
          `http://localhost:3000/${conversationIDparam}`
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setServerReadiness(true);
        setDataFromServer(data[0].messages);
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    }

    fetchFromProject();
  }, [conversationIDparam, navigate]);

  return (
    <div className=" relative flex flex-col justify-center items-center gap-2 w-full ">
      <Link to="/" className="self-start text-slate-200 text-sm underline hover:text-slate-400" reloadDocument>Start new</Link>
      <div className="w-full flex justify-start items-center gap-1">
      
        <p className="text-slate-300 text-xs">Serwer readiness:</p>
        <p
          className={`material-symbols-outlined text-[18px] flex justify-center items-center ${
            serverReadiness ? "text-green-500" : "text-red-500"
          }`}
        >
          {serverReadiness ? "done" : "close"}
        </p>
      </div>
      <div
        id="chatOutput"
        className="relative w-full  bg-black bg-opacity-50 drop-shadow-lg rounded-xl h-[600px] max-h-screen  *:text-slate-100 p-2"
      >
        <ChatMessages dataFromServer={dataFromServer} />
        {loading && <RespondingLoader message={userMessage.current.value} />}
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
      {dataFromServer
        ? dataFromServer.length > 20 && (
            <p className="text-xs text-slate-400">
              * for the optimization purposes, chat ony keeping context of the
              last 20 messages.
            </p>
          )
        : ""}
        
    </div>
  );
};

export default Chat;
