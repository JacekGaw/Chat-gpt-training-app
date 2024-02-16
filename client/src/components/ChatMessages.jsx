import React from "react";

const ChatMessages = ({ dataFromServer }) => {
  return (
    <div className="whitespace-pre-line flex flex-col gap-2 w-full">
      {dataFromServer && (
        dataFromServer.map((item, index) => {
          if (item.role !== "system") {
            return (
              <p
                key={index}
                className={`bg-black w-[80%] p-2 rounded-lg ${
                  item.role === "user"
                    ? "self-end bg-blue-950"
                    : " bg-black bg-opacity-50"
                }`}
              >
                {item.content}
              </p>
            );
          }
          else {return <p key={index}>I'm your assistant, ask me something!</p>}
        })
      )}
    </div>
  );
};

export default ChatMessages;
