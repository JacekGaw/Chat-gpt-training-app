import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const userMessage = useRef();
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    console.log(userMessage.current.value);
    e.preventDefault();
    let message = { userMessage: userMessage.current.value };
    fetch("http://localhost:3000/api/message", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        response.json();
        console.log(response)
      })
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full max-w-screen-md m-auto">
      <div
        id="chatOutput"
        className="w-full  bg-black bg-opacity-50 drop-shadow-lg rounded-xl h-[500px] *:text-slate-100 p-5"
      >
        {data}
        <p>Chat with bot will appear here...</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full gap-2 flex justify-center "
      >
        <input
          type="text"
          ref={userMessage}
          placeholder="Type your message here..."
          className="flex-1 drop-shadow-lg bg-black bg-opacity-50 rounded-lg p-2 text-slate-100 font-[300]"
        />
        <button
          type="submit"
          className="bg-purple-900 text-slate-300 py-2 px-4 drop-shadow-lg hover:-translate-y-1 translate-all duration-200 rounded-lg "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
