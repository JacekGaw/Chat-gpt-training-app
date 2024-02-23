import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartConv = () => {
    const navigate = useNavigate();

    const handleStart = async () => {
        try {
            let response = await fetch('http://localhost:3000/startConversation');
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            navigate(`/c/${JSON.parse(data)}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center items-center flex-col max-w-xl m-auto gap-5'>
            <p className='text-center font-[300] text-slate-200 text-sm'>Hello! Start an engaging conversation with our intelligent chatbot! Our bot is here to answer your questions, help solve problems, and provide support on any issue. Click the button below to open the chat window and begin interacting with our intelligent system. Don't hesitate to ask a question, our chatbot is ready for dialogue and eagerly awaiting to assist you!</p>
            <button onClick={handleStart} className=' text-slate-200 font-[700] p-5 rounded-xl shadow-lg border-4  border-black'>Start Conversation</button>
        </div>
    )

}

export default StartConv;