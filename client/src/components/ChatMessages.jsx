import React from "react";
import messageFormatter from "../helpers/messageFormatter";

const ChatMessages = ({ dataFromServer }) => {
  return (
    <div className="whitespace-pre-line flex flex-col gap-2 w-full">
      {dataFromServer && (
        dataFromServer.map((item, index) => {
          if (item.role !== "system") {
            
            return (
              <div
                key={index}
                className={`bg-black w-[80%] p-2 rounded-lg ${
                  item.role === "user"
                    ? "self-end bg-blue-950"
                    : " bg-black bg-opacity-50"
                }`}
              >
                {messageFormatter(item.content)}
              </div>
            );
          }
          else {return <p key={index}>I'm your assistant, ask me something!</p>}
        })
      )}
    </div>
  );
};

export default ChatMessages;
