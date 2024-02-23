import React, { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import RespondingLoader from "./RespondingLoader";
import { useParams, useNavigate, Link } from "react-router-dom";
import History from "./History";
import ChatForm from "./ChatForm";

const Chat = () => {
  const navigate = useNavigate();
  const [dataFromServer, setDataFromServer] = useState([]);
  const [serverReadiness, setServerReadiness] = useState(false);
  const [loading, setLoading] = useState(false);
  const { conversationIDparam } = useParams();

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
      <div className="w-full flex flex-row justify-between items-center">
        <Link
          to="/"
          className="self-start text-slate-200 text-sm underline hover:text-slate-400"
          reloadDocument
        >
          Start new
        </Link>
        <History data={dataFromServer} />
      </div>
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
        className="relative w-full  bg-black bg-opacity-50 drop-shadow-lg rounded-xl h-[600px] max-h-[80vh]  *:text-slate-100 p-2"
      >
        <ChatMessages dataFromServer={dataFromServer} />
        {loading && <RespondingLoader />}
      </div>
      <ChatForm
        onSubmit={(messages) => setDataFromServer(messages)}
        serverReadiness={serverReadiness}
        convID={conversationIDparam}
        inProgress={(income) => setLoading(income)}
      />
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
