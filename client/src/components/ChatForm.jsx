import React, {useRef} from 'react';

const ChatForm = ({onSubmit, serverReadiness, convID, inProgress}) => {
    const userMessage = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = { userMessage: userMessage.current.value };
        inProgress(true);
        fetch(`http://localhost:3000/${convID}/message`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        })
          .then((response) => response.json())
          .then((dataFromServer) => {
            inProgress(false);
            console.log(dataFromServer.message);
            onSubmit(dataFromServer.message);
            userMessage.current.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      };


    return ( 
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
          disabled={!serverReadiness}
        >
          Send
        </button>
      </form>
     );
}
 
export default ChatForm;