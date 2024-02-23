import React, { useEffect, useState } from "react";
import HistoryItem from "./HistoryItem";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const History = ({ data }) => {
  const [convHistoryList, setConvHistoryList] = useState([]);
  const navigate = useNavigate();
  const { conversationIDparam } = useParams();

  async function getHistory() {
    try {
      const response = await fetch("http://localhost:3000/history");
      if (!response.ok) {
        throw new Error(response.message);
      }
      const dataJSON = await response.json();
      const data = JSON.parse(dataJSON);
      setConvHistoryList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHistory();
  }, [data]);

  const handleDelete = (deletingID) => {
    getHistory();
    if (deletingID === conversationIDparam) {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="group relative flex flex-col w-auto">
        <header className=" flex items-center gap-1">
          <h3 className="text-slate-300 underline font-[500] text-sm ">
            Conversations History
          </h3>
          <button
            onClick={() => window.location.reload()}
            className="material-symbols-outlined text-slate-500"
          >
            history
          </button>
        </header>
        <div className="z-10 hidden group-hover:block w-auto absolute top-100 left-[-50%]">
          
        <ul className="flex flex-col gap-2 bg-[#121b32] p-5 rounded-md">
        <p className="text-slate-200 text-sm">History:</p>
          {convHistoryList.map((convHistory) => {
            return (
              <li
                key={convHistory._id}
                className={`group text-white w-full `}
              >
                <HistoryItem
                  historyInfo={convHistory}
                  onDelete={handleDelete}
                />
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </>
  );
};

export default History;
