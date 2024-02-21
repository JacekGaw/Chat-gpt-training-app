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
        const data = response;
        onDelete();
      } catch (error) {console.log(error)}
    }
    Delete();
  }

  return (
    <div className="group flex">
    <Link to={`c/${historyInfo._id}`} className="group w-full p-2 flex gap-2 flex-row justify-start *:text-sm ">
      <p>{decodeTimestamp(historyInfo.timestamp)}</p>
      <p>Messages: {historyInfo.messages.length}</p>
      
    </Link>
    <button className="group-hover:flex hidden material-symbols-outlined justify-center items-center" onClick={handleDelete}>delete</button>
 </div>
  );
};

export default HistoryItem;
