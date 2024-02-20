import React, {useContext} from 'react';
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
            console.log(JSON.parse(data));
            navigate(`/c/${JSON.parse(data)}`);
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div>
            <button onClick={handleStart}>Start Conversation</button>
        </div>
    )

}

export default StartConv;