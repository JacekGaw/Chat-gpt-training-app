import React from "react";
import { Link } from "react-router-dom";

const HistoryItem = ({ historyInfo }) => {

  return (
    <Link to={`c/${historyInfo._id}`}>
      {historyInfo.timestamp}
    </Link>
  );
};

export default HistoryItem;
