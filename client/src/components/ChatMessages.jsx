import React, { useState, useRef, useEffect } from "react";
import messageFormatter from "../helpers/messageFormatter";

const ChatMessages = ({ dataFromServer }) => {
  const parentRef = useRef();
  const dummyElement = useRef();

  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    handleScrollDown();
  }, [dataFromServer])

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
              return (
                <div
                  key={index}
                  className={`bg-black max-w-[80%] text-sm p-2 rounded-lg ${
                    item.role === "user"
                      ? "self-end bg-blue-950 text-right"
                      : " bg-black bg-opacity-50"
                  }`}
                >
                  <p className={`text-[10px] font-[700] uppercase w-full ${item.role === "user" && "text-right"}`}>{item.role}</p>
                  <p className="p-1 font-[300]">{messageFormatter(item.content)}</p>
                </div>
              );
            })
          ) : (
            <p key={Math.random()}>I'm your assistant, ask me something!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
