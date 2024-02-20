import React, { useState, useRef } from "react";
import messageFormatter from "../helpers/messageFormatter";

const ChatMessages = ({ dataFromServer }) => {
  const parentRef = useRef(null);
  const [showElement, setShowElement] = useState(false);

  const handleScroll = () => {
    const parentElement = parentRef.current;

    if (parentElement) {
      const isAtBottom =
        parentElement.scrollTop + parentElement.clientHeight ===
        parentElement.scrollHeight;
      setShowElement(!isAtBottom);
    }
  };

  const handleScrollDown = () => {
    const parentElement = parentRef.current;

    if (parentElement) {
      parentElement.scrollTop = parentElement.scrollHeight;
    }
  };

  return (
    <>
      <div className="relative w-full h-[100%]">
        {showElement && (
          <button
            onClick={handleScrollDown}
            className="material-symbols-outlined absolute bottom-[2%] left-[50%] translate-x-[-50%] bg-black border-4 border-sky-900 text-[15px]  transiton-all duration-300 p-2 rounded-full"
          >
            arrow_downward
          </button>
        )}
        <div
          ref={parentRef}
          onScroll={handleScroll}
          className="whitespace-pre-line flex flex-col scroll-smooth gap-2 w-full h-[100%] overflow-y-auto p-2"
        >
          {dataFromServer.length > 0 ? (
            dataFromServer.map((item, index) => {
              console.log(index);
              return (
                <div
                  key={item.content}
                  className={`bg-black w-[80%] text-sm p-2 rounded-lg ${
                    item.role === "user"
                      ? "self-end bg-blue-950"
                      : " bg-black bg-opacity-50"
                  }`}
                >
                  {messageFormatter(item.content)}
                </div>
              );
            })
          ) : (
            <p>I'm your assistant, ask me something!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
