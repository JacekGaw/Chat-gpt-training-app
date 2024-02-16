import React from "react";

const ChatClear = ({ onClearHistory }) => {
  const handleClearHistory = async () => {
    fetch("http://localhost:3000/api/clear-history", {
      method: "post",
    })
      .then((res) => res.json())
      .then((data) => {
        onClearHistory(data);
        console.log(data);
      });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <button onClick={handleClearHistory} className="underline drop-shadow-md">
        Clear History
      </button>
    </div>
  );
};

export default ChatClear;
