import React from "react";
import { Link } from "react-router-dom";
import decodeTimestamp from '../helpers/decodeTimestamp';


const HistoryItem = ({ historyInfo, onDelete }) => {

  const handleDelete = () => {
    async function Delete() {
      try {
        const response = await fetch(`http://localhost:3000/delete`, {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({convID: historyInfo._id}),
        });
        if(!response.ok) {
          throw new Error(`Could not delete ${historyInfo._id}`, response.message);
        }
        onDelete(historyInfo._id);
      } catch (error) {console.log(error)}
    }
    Delete();
  }

  return (
    <div className="group flex justify-between">
    <Link to={`/c/${historyInfo._id}`} className="group w-full p-1 flex gap-2 flex-row no-wrap *:text-xs *:text-slate-300 ">
      <p className="shrink-0">{decodeTimestamp(historyInfo.timestamp)}</p>
      <p className="shrink-0">Messages: {historyInfo.messages.length}</p>
      
    </Link>
    <button className="flex material-symbols-outlined justify-center text-[16px] items-center" onClick={handleDelete}>delete</button>
 </div>
  );
};

export default HistoryItem;
