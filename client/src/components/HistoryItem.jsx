import React from "react";
import { Link } from "react-router-dom";
import decodeTimestamp from '../helpers/decodeTimestamp';


const HistoryItem = ({ historyInfo }) => {
  console.log(historyInfo);
  return (

    <Link to={`c/${historyInfo._id}`} className="w-full p-2 flex flex-row justify-between *:text-sm ">
      <p>{decodeTimestamp(historyInfo.timestamp)}</p>
      <p>Messages: {historyInfo.messages.length}</p>

    </Link>

  );
};

export default HistoryItem;
