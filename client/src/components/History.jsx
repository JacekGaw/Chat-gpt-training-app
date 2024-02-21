import React, { useEffect, useState } from "react";
import HistoryItem from "./HistoryItem";
import { useNavigate } from "react-router";

const History = () => {
  const [convHistoryList, setConvHistoryList] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  const handleDelete = () => {
    getHistory();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex flex-col min-w-56">
        <header className="p-2 flex items-center gap-1">
          <h3 className="text-slate-300 font-[800] text-sm ">
            Conversations History:{" "}
          </h3>
          <button onClick={() => window.location.reload()} className="material-symbols-outlined text-slate-500">sync</button>
        </header>
        <ul className="flex flex-col justify-start items-start gap-2">
          {convHistoryList.map((convHistory) => {
            return (
              <li
                key={convHistory._id}
                className={`group rounded-lg  bg-black bg-opacity-20 border border-black  text-white `}
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
    </>
  );
};

export default History;
