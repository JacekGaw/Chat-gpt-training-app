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
        <div className='flex justify-center items-center'>
            <button onClick={handleStart} className='bg-purple-800 text-slate-200 font-[700] p-5 rounded-xl drop-shadow-xl border-2 border-violet-900'>Start Conversation</button>
        </div>
    )

}

export default StartConv;